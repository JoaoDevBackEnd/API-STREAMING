class Works {
    constructor(id, title, synopsis, active, genderId, categoryId, directorId,createdAt) {
      this.id = id;
      this.title = title;
      this.synopsis = synopsis;
      this.active = active;
      this.genderId = genderId;
      this.categoryId = categoryId;
      this.directorId = directorId;  
      this.createdAt=createdAt;
    }
  }

export default Works;