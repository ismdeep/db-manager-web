import {Component, OnInit, OnDestroy} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'database-item-edit',
  templateUrl: './database-item-edit.component.html',
})
export class DatabaseItemEditComponent implements OnInit, OnDestroy {

  // params
  database_id = 0;
  record_id = 0;
  record;

  // form
  databaseEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private ref: NzModalRef,
  ) {
  }

  ngOnInit() {
    if (this.record.id) {
      this.record_id = this.record.id
    }
    this.databaseEditForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    if (this.record) {
      this.databaseEditForm.patchValue({
        name: this.record.name,
        description: this.record.description
      })
    }
  }

  ngOnDestroy() {
  }

  submitForm() {
    let client = this.http.post(`/api/v1/databases/${this.database_id}/database_items`, this.databaseEditForm.value)
    if (this.record_id != 0) {
      client = this.http.put(`/api/v1/databases/${this.database_id}/database_items/${this.record.id}`, this.databaseEditForm.value)
    }
    client.subscribe(() => {
      this.msgSrv.success('保存成功')
      this.ref.close(true)
    })
  }

  close() {
    this.ref.close(true)
  }
}
