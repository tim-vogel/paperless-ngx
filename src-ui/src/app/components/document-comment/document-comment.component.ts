import { Component, OnInit } from '@angular/core';
import { DocumentDetailComponent } from 'src/app/components/document-detail/document-detail.component';
import { PaperlessDocumentCommentFrame } from 'src/app/data/paperless-document-comment-frame';
import { DocumentCommentService } from 'src/app/services/rest/document-comment.service';

import { PaperlessDocumentComment } from 'src/app/data/paperless-document-comment';

import { take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-comment',
  templateUrl: './document-comment.component.html',
  styleUrls: ['./document-comment.component.scss']
})
export class DocumentCommentComponent implements OnInit {

  commentsFrame:PaperlessDocumentCommentFrame;
  networkActive = false;
  documentId: number;
  commentForm: FormGroup = new FormGroup({
    newcomment: new FormControl('')
  })

  constructor(
    private documentDetailComponent: DocumentDetailComponent,
    private documentCommentService: DocumentCommentService,
  ) { }

  byId(index, item: PaperlessDocumentComment) {
    return item.id;
  }

  async ngOnInit(): Promise<any> {
    try {
      this.documentId = this.documentDetailComponent.documentId;
      this.commentsFrame = await this.documentCommentService.getComments(this.documentId).pipe(take(1)).toPromise();
    } catch(err){
      this.commentsFrame = {
        is_comments_enabled: false,
        comments: []
      }
    }
  }

  addComment(){
    this.networkActive = true
    this.documentCommentService.addComment(this.documentId, this.commentForm.get("newcomment").value).subscribe(result => {
      this.commentsFrame = result;
      this.commentForm.get("newcomment").reset();
      this.networkActive = false;
    }, error => {
      this.networkActive = false;
    });
  }

  deleteComment(event){
    let parent = event.target.parentElement.closest('div[comment-id]');
    if(parent){
      this.documentCommentService.deleteComment(this.documentId, parseInt(parent.getAttribute("comment-id"))).subscribe(result => {
        let deletedCommentCard = event.target.parentElement.closest('div.comment-card')
        deletedCommentCard.style.transition = "all .5s";
        deletedCommentCard.remove();

        this.networkActive = false;
      }, error => {
        this.networkActive = false;
      });
    }
  }

}
