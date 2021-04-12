import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { FormsModule } from '@angular/forms';
import { PageadminComponent } from './pageadmin/pageadmin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: `:userRole`, component: PageComponent },
      // { path: `:userRole`, component: PageadminComponent },
    ],
  },
];

@NgModule({
  declarations: [PageComponent, PageadminComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class PageModule {}
