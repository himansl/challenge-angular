import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_helpers/data.service';

@Component({
  selector: 'shortlist-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}
  profileData;
  id;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(el => {
      this.id = +el.get('id');
      this.profileData = this.dataService.getDataById(this.id);
      console.log(this.profileData);
    });
  }
}
