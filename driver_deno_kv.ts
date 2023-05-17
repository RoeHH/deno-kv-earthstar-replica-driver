import { ShareAddress } from "$$../util/doc-types.ts";
import { AttachmentDriverMemory } from "$$./attachment_drivers/memory.ts";
import { DocDriverDenoKV } from "./doc_drivers/deno-kv.ts";
import {
  IReplicaAttachmentDriver,
  IReplicaDocDriver,
  IReplicaDriver,
} from "$$./replica-types.ts";

/** A replica driver which stores data in deno KV. All data is lost when the replica is closed. */
export class ReplicaDriverDenoKv implements IReplicaDriver {
  docDriver: IReplicaDocDriver;
  attachmentDriver: IReplicaAttachmentDriver;

  constructor(shareAddress: ShareAddress) {
    this.docDriver = new DocDriverDenoKV(shareAddress);
    this.attachmentDriver = new AttachmentDriverMemory();
  }
}