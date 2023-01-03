import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {STColumn, STComponent} from '@delon/abc/st';
import {ModalHelper, _HttpClient, DrawerHelper, TitleService} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd';
import format from 'date-fns/format';
import {DatabaseEditComponent} from "../components/database-edit.component";
import {DatabaseItemDetailComponent} from "../components/database-item-detail.component";
import {DatabaseItemEditComponent} from "../components/database-item-edit.component";

@Component({
  selector: 'database-detail',
  templateUrl: './database-detail.component.html',
})
export class DatabaseDetailComponent implements OnInit, OnDestroy {

  // params
  private id: string;

  constructor(
    private http: _HttpClient,
    public message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private modalHelper: ModalHelper,
    private drawerHelper: DrawerHelper,
    public title: TitleService,
  ) {
  }


  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id']
    this.title.setTitle(`Database - DB Manager`)
    this.loadData()
  }

  ngOnDestroy() {
  }

  @ViewChild('st', {static: false}) st: STComponent;
  columns: STColumn[] = [
    {title: '状态', render: 'exit_code'},
    {title: '触发器', index: 'trigger_name'},
    {
      title: '开始时间', index: 'created_at',
      format: (item) => {
        return format(new Date(item.created_at), 'yyyy-MM-dd  HH:mm:ss');
      },
    },
    {
      title: '耗时',
      index: 'time_elapse_second',
      format: (item) => {
        let s = item.time_elapse_second
        if (s < 60) {
          return `${s} 秒`
        }

        s = (s / 60).toFixed(1)
        if (s < 60) {
          return `${s} 分钟`
        }

        s = (s / 60).toFixed(1)
        if (s < 24) {
          return `${s} 小时`
        }

        s = (s / 24).toFixed(1)
        return `${s} 天`
      }
    },
    {title: '操作', render: 'ops'}
  ];

  database = null;
  database_items = []

  editDatabase() {
    this.drawerHelper.static('编辑', DatabaseEditComponent, {record: this.database}, {size: document.body.clientWidth * 0.618}).subscribe(() => {
      this.loadData()
    });
  }

  loadData() {
    this.http.get(`/api/v1/databases/${this.id}`).subscribe((res) => {
      console.log(res.data)
      this.database = res.data
      this.title.setTitle(`${this.database.name} - DB Manager`)
    })

    this.http.get(`/api/v1/databases/${this.id}/database_items`).subscribe((res) => {
      if (res.data) {
        this.database_items = res.data
      }
    })

  }

  createDatabaseItem() {
    this.modalHelper.create(DatabaseItemEditComponent, {
      database_id: this.id,
      record: {}
    }, {size: 'lg'}).subscribe(() => {
      this.loadData()
    })
  }

  editItem(item) {
    this.modalHelper.create(DatabaseItemEditComponent, {
      database_id: this.id,
      record: item
    }, {size: 'lg'}).subscribe(() => {
      this.loadData()
    })
  }

  showItemDetail(item) {
    let opt = {
      size: window.document.body.clientWidth * 0.9,
    }
    this.modalHelper.create(DatabaseItemDetailComponent, {record: item}, opt).subscribe(() => {
    })
  }

  deleteItem(item) {
    this.message.info(JSON.stringify(item))
  }

}
