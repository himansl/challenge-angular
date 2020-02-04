import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppAngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, AppAngularMaterialModule],
  exports: [ReactiveFormsModule, CommonModule, HttpClientModule, AppAngularMaterialModule]
})
export class SharedModule {}
