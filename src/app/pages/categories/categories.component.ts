import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';

const api = environment.api;

@Component({
  selector: 'app-c',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public fileUploaderConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.jpeg,.gif',
    maxSize: '50',
    uploadAPI: {
      url: `${api}/categories/upload`
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Seleccionar imagen'
  };

  goForm: boolean = false;
  formulario: FormGroup;
  categories: any = []

  success: boolean;
  message = '';
  constructor(
    private categoriesService: CategoriesService,
    private ngxService: NgxUiLoaderService,
    public formBuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    await this.createForm();
    await this.getCategories();
  }

  async getCategories() {
    this.ngxService.start();
    let response: any = await this.categoriesService.get();
    this.categories = response.data;

    this.ngxService.stop();
  }

  async getCategory(id) {
    this.ngxService.start();
    let response: any = await this.categoriesService.get(id);
    this.formulario.get('id').setValue(response.id);
    this.formulario.get('name').setValue(response.name);

    this.ngxService.stop();
  }

  async createForm() {
    this.formulario = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required]]
    });
  }

  async guardar() {
    let response: any
    let id = await this.formulario.get('id').value;

    if (id) {
      response = await this.categoriesService.update(this.formulario.value, id);
    } else {
      response = await this.categoriesService.register(this.formulario.value);
    }
    console.log(response);

    this.success = (response.id) ? true : false;
    this.message = response.message;

    await this.getCategories();
    await this.createForm();
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  async cancelar() {
    this.createForm();
  }
}
