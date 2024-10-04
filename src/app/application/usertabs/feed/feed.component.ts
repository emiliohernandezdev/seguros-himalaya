import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent  implements OnInit {

  public posts: any[] = [];
  constructor(private postService: PostService, private loading: LoadingController, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getPosts()
  }

  public async getPosts(){
    const loading = await this.loading.create({
      message: 'Cargando publicaciones...',
    });

    loading.present();
    this.postService.getPosts(10).subscribe(async (res: any) => {
      if(res.success == true){
        this.posts = res.posts
        await loading.dismiss()
      }else{
        await loading.dismiss()
      }

    })
  }

  public getSanitized(post: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(post.link);
  }

  public openLink(url: string){
    Browser.open({ url: url })
  }


  // public getPreview(post: any){
  //   if(post.link.contains('tiktok')){
  //     return `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@seguros_himalaya/video/7390147277479824646`
  //   }else{
  //     return 'https://'+post.link
  //   }
  // }

}
