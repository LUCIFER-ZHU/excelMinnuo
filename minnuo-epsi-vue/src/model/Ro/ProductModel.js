class ProductModel{
  constructor(modelName,modelFile,modelDetails){
    this.modelName = modelName;
    this.modelFile = modelFile;
    this.modelDetails = modelDetails;
  }

  // 判断对象是否全都为空 @return 返回false表示对象不为空
  isAllNull(){
      if(this.modelName === '' && this.modelFile.length === 0 && this.modelDetails.length === 0){
          return true;
      }
      return false;
  }
}

export default ProductModel;
