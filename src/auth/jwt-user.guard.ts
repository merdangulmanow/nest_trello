import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


// @Injectable()
// export class JwtUserGuard implements CanActivate{

//     constructor(private jwtService : JwtService) {}

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

//         const req = context.switchToHttp().getRequest()
//         try {
            
//         } catch (e) {
//             throw new UnauthorizedException({message : 'Unauthorized user!'})
//         }
        
//     }
// }