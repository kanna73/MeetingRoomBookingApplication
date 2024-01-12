import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const CanActivate=()=>
{
   const authservice=inject(AuthService);
   const route=inject(Router);

   if(authservice.IsAuthenticated())
   {
      return true;
   }
   else{
    alert("Unauthorized access");
    route.navigate(['/login'])
    return false;
   }
}