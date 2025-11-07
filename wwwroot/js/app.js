import { TreeItem } from './components/TreeItem.js';
import Api from '../Services/ApiService.js';

const App = {
    data() {
        return {
            subdivisions: [],
            allSubdivisions: [],
            selectedSubdivision: null,
            selectedEmployee: null,
            selectedParent: null,
            dialogEditVisible: false,
            dialogDeleteVisible: false,
            dialogAddVisible: false,
            dialogEditEmployeeVisible: false,
            menuVisible: false,
            menuPositionX: 0,
            menuPositionY: 0,
            subName: ''
        };
    },
    methods: {
        async fetchSubdivision() { this.subdivisions = await Api.fetchSubdivisions(); },
        selectSubdivision(sub) { this.selectedSubdivision = sub; },
        openMenu(event, sub) {
            this.selectedSubdivision = sub;
            this.menuPositionX = event.clientX;
            this.menuPositionY = event.clientY;
            this.menuVisible = true;
        },
        closeMenu() { this.menuVisible = false; },
        
        openMenuEditSubdivision() { this.dialogEditVisible = true; },
        openMenuDeleteSubdivision(){this.dialogDeleteVisible = true; },
        async openMenuAddSubdivision(){this.dialogAddVisible = true;this.allSubdivisions = await Api.getSubdivision();console.log(this.allSubdivisions) },
        
        async saveEditedSubdivision() {
            if(this.subName.trim() === "" || !this.subName) {ElementPlus.ElMessage({ message: 'Впишите название подразделения!',  type: 'error',  duration: 3000});return;}
            const data = await Api.updateSubdivision(this.selectedSubdivision.id, this.subName);
            this.updateSubdivisions(data.idSubdivision, data.nameSubdivision,'update');
            this.dialogEditVisible = false;
            ElementPlus.ElMessage({ message: 'Подразделение успешно изменено!',  type: 'success',  duration: 3000});
            this.subName = "";
        },
        async deleteSubdivision() {
            const data = await Api.deleteSubdivision(this.selectedSubdivision.id);
            this.updateSubdivisions(data,'','delete');
            this.dialogDeleteVisible = false;
            ElementPlus.ElMessage({
                message: 'Подразделение успешно удалено!',
                type: 'success',
                duration: 3000
            });
        },
        async addSubdivision(parentId,name = ""){
            if(!name && !name.length){
                ElementPlus.ElMessage({
                    message: 'Название подразделения не может быть пустым!',
                    type: 'error',
                    duration: 3000
                });
            }
            const res = await Api.addSubdivision(parentId,name);
            if(res) {
                this.subdivisions = await Api.fetchSubdivisions();
                this.subName = "";
                this.selectedParent = null;
                ElementPlus.ElMessage({
                    message: 'Подразделение успешно добавлено!',
                    type: 'success',
                    duration: 3000
                });
            }
        },
        updateSubdivisions(id, name = '',action, subs = this.subdivisions) {
            console.log(action);
            for (const sub of subs) {
                if(action === 'update'){
                    if (sub.id === Number(id)) { sub.name = name; return; }
                    if (sub.subdivisionsChildrens?.length) this.updateSubdivisions(id, name,action, sub.subdivisionsChildrens);
                }else if(action === 'delete'){
                    if (sub.id === Number(id)) { const index = subs.findIndex(s => s.id === id);subs.splice(index,1);return; }
                    if (sub.subdivisionsChildrens?.length) this.updateSubdivisions(id, name,action, sub.subdivisionsChildrens);
                }
            }
        },
        openMenuForEmployee(emp) {
            this.dialogEditEmployeeVisible = true;
            this.selectedEmployee = {...emp};
            console.log(this.selectedEmployee);
        },
        async saveEditedEmployee(e) {
            if(!e.fullname || !e.position || !e.datebirth || !e.startdate || 
                !e.fullname.trim().length || !e.position.trim().length || !e.datebirth.trim().length || !e.startdate.trim().length) {
                ElementPlus.ElMessage({
                    message: 'Поля не могут быть пустыми!',
                    type: 'error',
                    duration: 3000
                });
            }
            const res = await Api.updateEmployee(e);
            if(res){
                this.subdivisions = await Api.fetchSubdivisions();
                this.selectedSubdivision = this.updateSelectedSubdivision(this.selectedSubdivision,this.subdivisions);
                this.dialogEditEmployeeVisible = false;
                ElementPlus.ElMessage({
                    message: 'Данные сотрудника успешно изменены!',
                    type: 'success',
                    duration: 3000
                });
            }else{
                ElementPlus.ElMessage({
                    message: 'Укажите корректную дату!',
                    type: 'error',
                    duration: 3000
                });
            }
        },
        updateSelectedSubdivision(currentSubdivision,subdivisions = this.subdivisions) {
            for (const sub of subdivisions) {
                if(sub.id === currentSubdivision.id){
                    return sub;
                }else{
                    if(sub.subdivisionsChildrens && sub.subdivisionsChildrens.length){
                       const found = this.updateSelectedSubdivision(currentSubdivision,sub.subdivisionsChildrens);
                       if(found) return found;
                    }
                }
            }
           return null;
        }
    },
    mounted() {
        this.fetchSubdivision();
        document.addEventListener('click', this.closeMenu);
    },
    beforeUnmount() { document.removeEventListener('click', this.closeMenu); },
    computed: {
        averageAge() {
            if (this.subdivisionIsNull) return 0;
            const today = new Date();
            const ages = this.selectedSubdivision.employees.map(emp => {
                const birthDate = new Date(emp.datebirth);
                let age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();
                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--;
                return age;
            });
            return (ages.reduce((acc, val) => acc + val, 0) / ages.length).toFixed(1);
        },
        averageTimeWork() {
            if (this.subdivisionIsNull) return 0;

            const today = new Date();
            const empTimeWork = this.selectedSubdivision.employees.map(emp => {
                const timeWokrNow = new Date(emp.startdate);
                let years = today.getFullYear() - timeWokrNow.getFullYear();
                years += (today.getMonth() - timeWokrNow.getMonth()) / 12;
                return years;
            });
            return (empTimeWork.reduce((acc, val) => acc + val, 0) / empTimeWork.length).toFixed(1);
        },
        subdivisionIsNull() {
            if (this.selectedSubdivision && this.selectedSubdivision.employees.length === 0) return true;
        }
    },
    components: { TreeItem }
};

const app = Vue.createApp(App);
app.component(ElementPlus.ElDialog.name, ElementPlus.ElDialog);
app.component(ElementPlus.ElButton.name, ElementPlus.ElButton);
app.mount('#app');