const BASE_URL = "http://localhost:5247/Subdivision";
const BASE_URL_EMPLOYEE = "http://localhost:5247/Employee";

const Api = {
    async fetchSubdivisions() {
        const res = await fetch(`${BASE_URL}/dto`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
    },
    async updateSubdivision(id, name) {
        const res = await fetch(`${BASE_URL}/PutDto`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, name})
        });
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
    },
    async deleteSubdivision(id) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },
     async getSubdivision() {
        const res = await fetch(`${BASE_URL}`, {
            method: 'GET'
        });
        return res.json();
    },
    async addSubdivision(parentId = null,name) {
        const res = await fetch(`${BASE_URL}/PostDto`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                parentId: parentId,
                name: name
            })
        });
        return res.ok;
        
    },
    async updateEmployee(emp){
        const res = await fetch(`${BASE_URL_EMPLOYEE}`, {
            method: 'PUT',
            headers:{ "Content-Type":"application/json"},
            body: JSON.stringify(emp)
        });
        return res.ok;
    }
    
}
export default Api;