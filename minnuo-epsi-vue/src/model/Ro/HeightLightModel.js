class HeightLightModel{
  constructor(file,intro,summarize){
    this.file = file;
    this.intro = intro;
    this.summarize = summarize;
  }

  // 方法用于判断是否全为空
  isAllNull(){
      if(this.file === undefined && this.intro === "" && this.summarize.length === 0){
        return true;
      }
      return false;
  }
}

export default HeightLightModel;
