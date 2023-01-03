import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {SFComponent, SFSchema, SFUISchema} from '@delon/form';
import {_HttpClient} from '@delon/theme';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {tap} from 'rxjs/operators';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';

@Component({
  selector: 'register',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  @ViewChild('sf') sf: SFComponent;

  constructor(
    private message: NzMessageService,
    private http: _HttpClient,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  schema: SFSchema = {
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        ui: {
          placeholder: '请输入用户名',
          errors: {
            required: '请输入用户名',
          },
        },
      },
      password: {
        type: 'string',
        title: '密码',
        ui: {
          type: 'password',
          placeholder: '请输入密码',
          errors: {
            required: '请输入密码',
          },
        },
      },
    },
    required: ['username', 'password'],
  };

  ngOnInit(): void {
  }

  isLogging = false
  login_text = '注 册'

  submit(e) {
    this.isLogging = true;
    this.login_text = '注册中'
    this.http.post(`/api/v1/sign-up`, e).subscribe((res) => {
      setTimeout(() => {
        this.isLogging = false
        this.login_text = '注册成功'
        this.message.success('注册成功！');
        this.tokenService.set({token: res.data});
        window.location.href = '/'
      }, 1000)
    }, () => {
      setTimeout(() => {
        this.isLogging = false
        this.login_text = '注 册'
      }, 1000)
    });
  }
}
