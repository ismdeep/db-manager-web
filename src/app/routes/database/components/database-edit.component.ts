import {Component, OnInit, OnDestroy} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'database-edit',
  templateUrl: './database-edit.component.html',
})
export class DatabaseEditComponent implements OnInit, OnDestroy {

  // params
  record = null;

  // form
  databaseEditForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private ref: NzDrawerRef,
  ) {
  }

  ngOnInit() {
    this.databaseEditForm = this.fb.group({
      name: [null, [Validators.required]],
      db_type: [null, [Validators.required]],
      host: [null, [Validators.required]],
      port: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      dsn: [null, [Validators.required]],
      description: [null],
    });
    if (this.record) {
      console.log(this.record)
      this.databaseEditForm.patchValue({
        name: this.record.name,
        db_type: this.record.db_type,
        host: this.record.host,
        port: this.record.port,
        username: this.record.username,
        password: this.record.password,
        dsn: this.record.dsn,
        description: this.record.description
      })
    }
  }

  ngOnDestroy() {

  }

  submitForm() {
    console.log(this.record)
    let client = this.http.post(`/api/v1/databases`, this.databaseEditForm.value)
    if (this.record != null) {
      client = this.http.put(`/api/v1/databases/${this.record.id}`, this.databaseEditForm.value)
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
