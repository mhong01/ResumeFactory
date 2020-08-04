import HttpServices from "../Services/HttpServices";

class ResumeControllerClass{

    httpServices = new HttpServices();

    baseURL = "resumes/";

    async addNewResume(data){
        let result = await this.httpServices.post(this.baseURL + "addnewresume", data);
        console.log(result);
        return result;
    }

    async saveResume(id, data) {
        let result = await this.httpServices.put1(this.baseURL + id, data);
        console.log('save', result);
        return result;
    }

    async getAllResumes (){
        let result = await this.httpServices.get(this.baseURL + "allResumes");
        console.log(result);
        return result;
    }

//resumes/resumes?userId=1
    async getResumesByUserId (userId){
        let result = await this.httpServices.get( this.baseURL +"resumes?userId=" +userId);
        console.log('getResumesByUserId', result);
        return result;
    }

    async getResumesById (resumeId){
        let result = await this.httpServices.get( this.baseURL + resumeId);
        if(result.success) {
            result.data.content = JSON.parse(result.data.content)
        }
        return result;
    }

    async getCountResumeByUserId (userId){
        let result = await this.httpServices.get( this.baseURL +"count?userId=" +userId);
        return result;
    }

    async addPersonalInfo(data){
        
    }

    async saveTempEduData( data ){
        let result = await this.httpServices.post(this.baseURL + "saveEdu", data);
        console.log(result);
        return result;
    }

    async saveTempPersonInfo( data ){
        let result = await this.httpServices.post(this.baseURL + "saveInfo", data);
        console.log(result);
        return result;
    }

    async getPersonalInfo( userId ){
        let result = await this.httpServices.get(this.baseURL + "personalInfo?userId=" + userId);
        console.log(result);
        return result;
    }

}
let ResumeController = new ResumeControllerClass();
export default ResumeController;
