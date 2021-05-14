import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriesService } from 'src/app/services/categories.service';
import { TipsService } from 'src/app/services/tips.service';


declare let $: any;

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

editorConfig={
     height: 300,
     menubar: false,
     plugins: [
       'advlist autolink lists link image charmap print preview anchor',
       'searchreplace visualblocks code fullscreen',
       'insertdatetime media table paste code help wordcount'
     ],
     toolbar:
       'undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help'
   }

  goForm: boolean = false;
  formulario: FormGroup;
  tips: any = [];
  categories: any = [];
  editorValue: string = ''

  success: boolean;
  message = '';
  constructor(
    private tipsService: TipsService,
    private ngxService: NgxUiLoaderService,
    public formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.createForm();
    this.getCategories();
    this.getTips();
  }

  async ngOnInit() {
  }

  async getCategories() {
    this.ngxService.start();
    let response: any = await this.categoriesService.get();
    this.categories = response.data;

    this.ngxService.stop();
  }

  async getTips() {
    this.ngxService.start();
    let response: any = await this.tipsService.get();
    this.tips = response.data;

    this.ngxService.stop();
  }

  async getTip(id) {
    this.ngxService.start();
    let response: any = await this.tipsService.get(id);
    this.formulario.get('id').setValue(response.id);
    this.formulario.get('title').setValue(response.title);
    this.formulario.get('description').setValue(response.description);
    this.formulario.get('category').setValue(response.category);
    this.formulario.get('withReminder').setValue(response.withReminder == 1);

    this.ngxService.stop();
  }

  async createForm() {
    this.formulario = this.formBuilder.group({
      id: [0],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [null, [Validators.required]],
      withReminder: [false, [Validators.required]]  
    });
  }

  async guardar() {
    console.log(this.formulario.value);
    
    let response: any
    let id = await this.formulario.get('id').value;

    if (id) {
      response = await this.tipsService.update(this.formulario.value, id);
    } else {
      response = await this.tipsService.register(this.formulario.value);
    }
    console.log(response);

    this.success = (response.id) ? true : false;
    this.message = response.message;

    await this.getTips();
    await this.createForm();
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  async cancelar() {
    this.createForm();
  }

}
