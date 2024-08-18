import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, query, collectionData, where, getDocs, addDoc, docData, OrderByDirection, orderBy } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore) { }

  docRef(path: any) {
    return doc(this.firestore, path);
  }

  collectionRef(path: any) {
    return collection(this.firestore, path);
  }

  setDocument(path:any, data:any){
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data);
  }

  addDocument(path:any, data:any){
    const dataRef = this.collectionRef(path);
    return addDoc(dataRef,data);
  }
  

  getDocById(path: any) {
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocs(path:any, queryFn?:any){
    let dataRef: any=this.collectionRef(path);
    if (queryFn){
      const q = query(dataRef,queryFn);
      dataRef = q;
    }
    return getDocs(dataRef);
  }

  collectionDataQuery(path: any, queryFn?: any) {
    let dataRef: any = this.collectionRef(path);
    if (queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef, {idField: 'id'});
    return collection_data;
  }

  docDataQuery(path:any, id?:any, queryFn?:any){
    let dataRef: any = this.docRef(path);
    if (queryFn) {
      const q = query (dataRef, queryFn);
      dataRef = q;
    }
    let doc_data;
    if(id) doc_data = docData<any>(dataRef, {idField: 'id'});
    else doc_data = docData<any>(dataRef,);
    return doc_data;
  }

  whereQuery(fieldPath:any,condition:any,value:any){
    return where(fieldPath,condition,value)
  }

  orderByQuery(fieldPath:any, directionStr:OrderByDirection= 'asc'){
    return orderBy(fieldPath, directionStr);
  }
}
