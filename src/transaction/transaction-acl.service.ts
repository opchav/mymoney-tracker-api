import { Injectable } from '@nestjs/common';

import { ROLE } from '../auth/constants/role.constant';
import { BaseAclService } from '../shared/acl/acl.service';
import { Action } from '../shared/acl/action.constant';
import { Actor } from '../shared/acl/actor.constant';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionAclService extends BaseAclService {
  constructor() {
    super();
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.USER, [Action.Create, Action.List, Action.Read]);
    this.canDo(ROLE.USER, [Action.Update, Action.Delete], this.isTxAuthor);
  }

  isTxAuthor(tx: Transaction, user: Actor): boolean {
    return tx.owner.id === user.id;
  }
}
