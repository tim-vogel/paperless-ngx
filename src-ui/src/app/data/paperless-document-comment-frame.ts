import { ObjectWithId } from './object-with-id'
import { PaperlessDocumentComment } from './paperless-document-comment'

export interface PaperlessDocumentCommentFrame extends ObjectWithId {
    is_comments_enabled?:boolean
    comments?:PaperlessDocumentComment[]
  }