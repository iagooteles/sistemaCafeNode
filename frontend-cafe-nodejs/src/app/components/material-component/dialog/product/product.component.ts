import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { GlobalConstants } from '../../../../shared/global-constants';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    FlexLayoutModule,
    MatInputModule,
    NgIf,
    HttpClientModule,
    MatSelectModule,
    CommonModule
  ],

  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Adicionar";
  responseMessage:any;
  categories:any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    })

    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Editar";
      this.productForm.patchValue(this.dialogData.data);
    }

    this.getCategories();    
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response:any) => {
        this.categories = response;
      },
      error: (error: any) => {
        console.log(error);
        this.dialogRef.close();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      }
    });
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.productForm.value;
    const data = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price.toString().replace(',', '.')),
      description: formData.description,
    };
  
    this.productService.add(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      error: (error: any) => {
        console.log(error);      
        this.dialogRef.close();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      }
    });
  }
    
  edit() {
    const formData = this.productForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };
  
    this.productService.update(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      error: (error: any) => {
        console.log(error);      
        this.dialogRef.close();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      }
    });
  }
}
