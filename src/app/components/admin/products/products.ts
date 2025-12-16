import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Dashboard } from "../dashboard/dashboard";
import { Title } from '@angular/platform-browser';
import { initFlowbite } from 'flowbite';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductServices } from '../../../services/product-services';
import { CategoryServices } from '../../../services/category-services';
import Swal from 'sweetalert2';



interface Category {
  id?: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [Dashboard, NgFor, NgIf, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements AfterViewInit {
  constructor(private readonly router: Router, private readonly title: Title, private readonly productServices: ProductServices, private readonly categoryServices: CategoryServices) {
    this.title.setTitle('Admin Products - StyleHub');
  }


  totalProducts = 342;
  outOfStock = 24;
  categories = 12;
  totalOrders = 1248;

  productCategories: any = {};

  newProduct: any = { id: 0, image_path: null, name: '', category_id: '', stock: 0, price: 0 };
  newCategory: Category = { name: '', description: '' };
  isModalOpen = false;
  isCategoryModalOpen = false;
  isDeleteCategoryModalOpen = false;

  products: any = {};

  pagination: any = {
    current_page: 1,
    last_page: 1,
    links: [] as any[]
  };

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;

      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target!.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(this.selectedFile as File);
    }
  }



  // Actions
  openModal() {
    this.isModalOpen = true;
  }

  openCategoryModal() {
    this.isCategoryModalOpen = true;
  }

  closeCategoryModal() {
    this.isCategoryModalOpen = false;
  }

  openDeleteCategoryModal() {
    this.isDeleteCategoryModalOpen = true
  }

  closeDeleteCategoryModal() {
    this.isDeleteCategoryModalOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newProduct = { image_path: '', name: '', category_id: '', stock: 0, price: 0 };
  }

  addProduct() {

    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('category_id', this.newProduct.category_id);
    formData.append('stock', this.newProduct.stock.toString());
    formData.append('price', this.newProduct.price.toString());

    if (this.selectedFile) {
      formData.append('image_path', this.selectedFile, this.selectedFile.name);
    }
    this.productServices.addProduct(formData).subscribe({
      next: (res) => {
        Swal.fire({
          theme: 'auto',
          icon: 'success',
          text: 'Product added Successfully'
        }).then((willdiect: any) => {
          if(willdiect.isConfirmed){
            window.location.reload();
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addCategory() {
    console.log(localStorage.getItem('token'))
    this.categoryServices.addCategory({
      name: this.newCategory.name,
      description: this.newCategory.description
    }).subscribe({
      next: (res: any) => {
        Swal.fire({
          theme: 'auto',
          icon: 'success',
          title: 'Success',
          text: res.message
        }).then((redirect: any) => {
          if (redirect.isConfirmed) {
            this.router.navigate(['/'])
          }
        });

      },
      error: (err) => {
        console.log(err)

      }
    })
  }

  deleteCategory() {
    this.categoryServices.deleteCategory(this.productCategories.id).subscribe({
      next: (res: any) => {
        Swal.fire({
          theme: 'auto',
          icon: 'success',
          title: 'Success',
          text: res.message
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  fetchProducts(page: number = 1) {
    this.productServices.fetchProducts(page).subscribe({
      next: (res: any) => {
        this.products = res.data;

        this.pagination.current_page = res.current_page;
        this.pagination.last_page = res.last_page;
        this.pagination.links = res.links;
      },
      error: err => console.error(err)
    });
  }

  goToPage(url: string | null) {
    if (!url) return;

    const page = new URL(url).searchParams.get('page');
    if (page) {
      this.fetchProducts(+page);
    }
  }



  // editProduct(product: Product) {
  //   alert(`Edit ${product.name}`);
  // }

  // deleteProduct(product: Product) {
  //   if (confirm(`Are you sure you want to delete ${product.name}?`)) {
  //     this.products = this.products.filter(p => p !== product);
  //   }
  // }

  ngAfterViewInit(): void {
    this.categoryServices.fetchCategories().subscribe({
      next: (res) => {
        this.productCategories = res
        console.log(res);
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.fetchProducts();

  }
}
