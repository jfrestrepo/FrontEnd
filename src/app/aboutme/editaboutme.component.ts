import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from '../model/persona.model';
import { ImageService } from '../service/image.service';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './editaboutme.component.html',
  styleUrls: ['./editaboutme.component.css']
})
export class EditaboutmeComponent implements OnInit{
persona: persona = null;
constructor(private activatedRouter: ActivatedRoute,
  private personaService: PersonaService,
  private router: Router,
  public imageService: ImageService){}

ngOnInit(): void {                                                        
  const id = this.activatedRouter.snapshot.params['id'];
  this.personaService.detail(id).subscribe(
    data =>{
      this.persona = data;
    }, err =>{
       alert("Error al modificar");
       this.router.navigate(['']);
    }
  )
}

onUpdate(): void{
  const id = this.activatedRouter.snapshot.params['id'];
  this.persona.img = this.imageService.url
    this.personaService.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
}

uploadImage($event:any){
  const id = this.activatedRouter.snapshot.params['id'];
  const name = "perfil_" + id;
  this.imageService.uploadImage($event, name)
}
}
