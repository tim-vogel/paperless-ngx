import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaperlessDocumentComment } from 'src/app/data/paperless-document-comment';
import { AbstractPaperlessService } from './abstract-paperless-service';
import { Observable } from 'rxjs';
import { PaperlessDocumentCommentFrame } from 'src/app/data/paperless-document-comment-frame';

@Injectable({
    providedIn: 'root'
})
export class DocumentCommentService extends AbstractPaperlessService<PaperlessDocumentCommentFrame> {

  constructor(http: HttpClient) {
    super(http, 'documents')
  }

  
  getComments(id: number): Observable<PaperlessDocumentCommentFrame> {
    return this.http.get<PaperlessDocumentCommentFrame>(this.getResourceUrl(id, "comments"))
  }

  addComment(id: number, comment) {
    return this.http.post(this.getResourceUrl(id, 'comments'), {"payload": comment})
  }

  deleteComment(documentId: number, commentId: number){
    let httpParams = new HttpParams();
    httpParams = httpParams.set("commentId", commentId.toString());
    return this.http.delete(this.getResourceUrl(documentId, 'comments'), {params: httpParams});
  }
}