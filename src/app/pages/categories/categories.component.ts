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
  selectedFile: File = null;

  success: boolean;
  message = '';
  constructor(
    private categoriesService: CategoriesService,
    private ngxService: NgxUiLoaderService,
    public formBuilder: FormBuilder
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
    this.formulario.get('url').setValue(response.image);
    
    this.ngxService.stop();
  }

  async createForm() {
    this.formulario = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      url: [''],
    });
  }

  async guardar() {
    const formdata = new FormData();
    if (this.selectedFile) formdata.append('file', this.selectedFile); 
    for (const field in this.formulario.controls) {
      if (this.formulario.controls[field].value) formdata.append(field, this.formulario.controls[field].value);
    }

    let response: any
    let id = await this.formulario.get('id').value;
    if (id) {
      response = await this.categoriesService.update(formdata, id); 
    } else {
      response = await this.categoriesService.register(formdata);
    }

   this.success = (response.id) ? true : false;
    this.message = response.message;

    if (this.success) {
      await this.getCategories();
      this.formulario.reset();
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }
  }

  async cancelar() {
    this.formulario.reset();
  }

  async onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }

}
