import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = {
    ADMIN: 'ADMIN',
    NORMAL_USER: 'NORMAL_USER'
}
@Injectable()
export class RoleGuard implements CanActivate {
    public role: string;
    constructor(role: string) {
        this.role = role;
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const { role } = ctx.user;
        console.log(role);
        const role1 = role.toUpperCase()
        if (role1 == this.role) return true;
        return false;
    }
}

