const normalDate = (oldDate: string) => {
    const newTokef = oldDate.split(",")[0];
    const newDate =
      newTokef.split("-")[2] +
      "/" +
      newTokef?.split("-")[1] +
      "/" +
      newTokef?.split("-")[0];
    return newDate;
  };
  
  export default normalDate;