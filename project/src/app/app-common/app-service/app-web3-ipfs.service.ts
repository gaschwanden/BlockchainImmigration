import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";
import * as ipfsAPI from "ipfs-api"
import {Buffer} from "buffer"

@Injectable()
export class AppIpfsService {
	uri: string = environment.IPFSProvider;
	ipfs: any;

	constructor() {
		this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
	}

	add(fileToUpload: File): Observable<any> {
		return Observable.create(observer => {
			let that = this;
			let reader: FileReader = new FileReader();
			reader.onloadend = function (e) {
				that.ipfs.files.add(Buffer.from(reader.result), (err, res) => {
					if (err) {
						observer.error(err);
					} else {
						for (let i = 0; i < res.length; i++) {
							observer.next(res[i]);
						}
						observer.complete();
					}
				});
			};

			reader.readAsArrayBuffer(fileToUpload);
		});
	}
}

