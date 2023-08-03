const truckInfoBlock: HTMLElement | null = document.getElementById('truck__info')
const truckInfoTable: HTMLElement | null = document.getElementById('truck__info__table')
const allInfoBtn: HTMLElement | null = document.getElementById('truks__status')
const singleInfoBtn: HTMLElement | null = document.getElementById('single__truk__status')

class Driver {
    name: string;
    surname: string;
    age: number;
    experience: number;
    constructor(name: string, surname: string, age: number, experience: number){
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.experience = experience;
    }   
}
class RamdomDriver {
    static createRandomDriver ():Driver {
        let names: string[] = ['Arthur', 'Bill', 'John' , 'Rick', 'Tom', 'Gerald', 'Kurise', 'Linbaba', 'Spike', 'Victor', 'Ron', 'Harry', 'Dorian', 'Sofi', 'Charles', 'Islam', 'Tai', 'Glover']
        let surnames: string[] = ['Morgan', 'Butcher', 'Maclein' , 'Grimes', 'Hardy', 'Makise', 'Prat', 'Bibop', 'Coi', 'Rivera', 'Whisly', 'Potter' , 'Gray', 'Mur', 'Oliveira', 'Machachev', 'Tuivasa', 'Teishaira']
        let randomName = Math.floor(Math.random() * names.length) 
        let randomSurname = Math.floor(Math.random() * surnames.length)
        let randomAge = Math.floor(Math.random()* (65 - 18) + 18)
        let randomExp = Math.floor(Math.random()* ((randomAge - 16) - 3) + 3)
        return new Driver (names[randomName], surnames[randomSurname], randomAge, randomExp )
    }

    static createDrivers (amount: number): void{
        for(let i = 0; i < amount; i++)
        drivers.push(this.createRandomDriver())
    }
}

abstract class ITruckState {
    abstract stringState: string;
    abstract changeDriver (truck: Truck):void;
    abstract startRun (truck: Truck): void;
    abstract startRepair (truck: Truck):void;
    abstract returnToBase (truck: Truck):void;

}

class OnBase extends ITruckState {
    public stringState = 'Base'
    public changeDriver(truck: Truck): void {
        let newDriver = RamdomDriver.createRandomDriver()
        truck.driver = newDriver
        renderAlert(`Your new driver is ${newDriver.name} ${newDriver.surname} !`)
    }
    public startRun(truck: Truck): void {
        truck.changeState(new OnRun())
        truck.stringState = truck.state.stringState
        renderAlert('Truck is on run Successfully !')
    }
    public startRepair(truck: Truck): void {
        truck.changeState(new OnRepear())
        truck.stringState = truck.state.stringState
        renderAlert('Truck is on repair Successfully !')
    }
    public returnToBase(truck: Truck): void {
        renderAlert('Truck is already on base')
    }
}

class OnRun extends ITruckState {
    public stringState = 'Run'
    public changeDriver(truck: Truck): void {
        renderAlert('Unfortunately u can not change driver while truck is on run !')
    }
    public startRun(truck: Truck): void {
        renderAlert('Truck is already on run')
    }
    public startRepair(truck: Truck): void {
        truck.changeState(new OnRepear())
        truck.stringState = truck.state.stringState
        renderAlert('Truck is on repair Successfully !')
    }
    public returnToBase(truck: Truck): void {
        truck.changeState(new OnBase())
        truck.stringState = truck.state.stringState
        renderAlert('Truck returned to base Successfully !')
        
    }
}

class OnRepear extends ITruckState {
    public stringState = 'Repair'
    public changeDriver(truck: Truck): void {
        renderAlert('Unfortunately u can not change driver while truck is on repair !')
    }
    public startRun(truck: Truck): void {
        let random = Math.floor(Math.random() * 2)
        truck.changeState(random === 2? new OnBase() : new OnRun())
        truck.stringState = truck.state.stringState
    }
    public startRepair(truck: Truck): void {
        renderAlert('Truck is already on repair')
    }
    public returnToBase(truck: Truck): void {
        renderAlert('Unfortunately u can not change driver while truck is on repair !')
    }
}
class Truck {
    id: string;
    name: string;
    driver: Driver;
    state: ITruckState;
    stringState: string;
    constructor (name: string, driver: Driver){
        this.name = name;
        this.driver = driver;
        this.state = new OnBase();
        this.stringState = this.state.stringState
        this.id = this.createId()
    }
    changeState (state: ITruckState): void {
        this.state = state
    }
    createId ():string {
        let result = `${this.driver.name[0]}${Math.floor(Math.random() * (10000 - 1000) + 1000)}${this.driver.surname[0]}${Math.floor(Math.random() * (1000 - 100) + 100)}`
        return result
    }
    changeDriver ():void {
        this.state.changeDriver(this)
    }
    startRun (): void {
        this.state.startRun(this)
    }
    startRepair ():void {
        this.state.startRepair(this)
    }
    returnToBase ():void {
        this.state.returnToBase(this)
    }
}

const showAllTrucksInfo = function(): void{
    document.querySelectorAll('#sTruck')?.forEach(el => el.remove())
    document.querySelectorAll('tr').forEach(el => el.remove())
    document.querySelectorAll('th').forEach(el => el.remove())
    const tableHeadId: HTMLElement= document.createElement('th')
    tableHeadId.innerText = 'ID'
    const tableHeadName: HTMLElement = document.createElement('th')
    tableHeadName.innerText = 'NAME'
    const tableHeadDriver: HTMLElement = document.createElement('th')
    tableHeadDriver.innerText = 'DRIVER'
    const tableHeadStatus: HTMLElement = document.createElement('th')
    tableHeadStatus.innerText = 'STATUS'
    const tableHeadControl: HTMLElement = document.createElement('th')
    tableHeadControl.innerText = 'CONTROL'
    truckInfoTable?.append(tableHeadId, tableHeadName, tableHeadDriver, tableHeadStatus, tableHeadControl)
    trucks.forEach(el => {
        const truckCon: HTMLElement = document.createElement('tr')
        const truckId: HTMLElement = document.createElement('td')
        const removeTruck: HTMLElement = document.createElement('button')
        truckId.innerText = el.id
        const truckName: HTMLElement= document.createElement('td')
        truckName.innerText = el.name
        const driverName: HTMLElement  = document.createElement('td')
        driverName.innerText = `${el.driver.name}  ${el.driver.surname}`
        const truckStatus: HTMLElement= document.createElement('td')
        truckStatus.innerText = el.stringState
        truckCon.append(truckId, truckName, driverName, truckStatus)
        truckCon.style.fontSize = '15px'
        truckInfoTable?.append(truckCon)
        const changeDriverBtn: HTMLElement = document.createElement('button')
        changeDriverBtn.innerHTML = 'Change Driver <i class="fa-solid fa-id-card"></i>'
        const startRunBtn: HTMLElement = document.createElement('button')
        startRunBtn.innerHTML = 'Start run <i class="fa-solid fa-truck-moving"></i>'
        const startRepairBtn: HTMLElement = document.createElement('button')
        startRepairBtn.innerHTML = 'Start repair <i class="fa-solid fa-screwdriver-wrench"></i>'
        const returnToBaseBtn: HTMLElement = document.createElement('button')
        returnToBaseBtn.innerHTML = 'Back to base <i class="fa-solid fa-house"></i>'
        const truckControl: HTMLElement= document.createElement('td')
        const truckControlsCon: HTMLElement = document.createElement('div')
        const showControlPanel: HTMLElement = document.createElement('button')
        const closeControlPanel: HTMLElement = document.createElement('button')
        closeControlPanel.style.border = 'none'
        closeControlPanel.innerText = 'x'
        changeDriverBtn.addEventListener('click', () => {
            el.changeDriver()
        })
        startRunBtn.addEventListener('click', () => {
            el.startRun()
        })
        startRepairBtn.addEventListener('click', () => {
            el.startRepair()
        })
        returnToBaseBtn.addEventListener('click', () => {
            el.returnToBase()
        })
        showControlPanel.addEventListener('click', () => {
            truckControl.style.backgroundColor = 'black'
            truckControlsCon.style.height = 'auto'
            showControlPanel.style.opacity = '0'
        })
        
        closeControlPanel.addEventListener('click', () => {
            truckControl.style.backgroundColor = 'transparent'
            truckControlsCon.style.height = '0px'   
            showControlPanel.style.opacity = '1'
        })
        showControlPanel.innerText = 'Show options'
        showControlPanel.style.cursor = 'pointer'
        truckControlsCon.className = 'truck__control__buttons'
        truckControlsCon.append(closeControlPanel,changeDriverBtn, startRunBtn, startRepairBtn, returnToBaseBtn)
        truckControlsCon.style.height = '0px'
        truckControlsCon.style.overflow = 'hidden'
        truckControl.append(truckControlsCon)
        truckControl.append(showControlPanel)
        truckCon.append(truckControl)
    })
}

const renderPopap = function ():void{
    const popapBg: HTMLElement = document.createElement('div')
    popapBg.style.display = 'flex'
    popapBg.style.justifyContent = 'center'
    popapBg.style.alignItems = 'center'
    popapBg.style.position = 'absolute'
    popapBg.style.top = '0%'
    popapBg.style.left = '0%'
    popapBg.style.width = '100%'
    popapBg.style.height = '100%'
    popapBg.style.backgroundColor = 'rgba(0, 0, 0, 0.716)'
    const popap: HTMLElement = document.createElement('div')
    popap.style.width = '500px'
    popap.style.height = '200px'
    popap.style.backgroundColor = 'white'
    popap.style.borderRadius = '10px'
    popap.style.display = 'flex'
    popap.style.justifyContent = 'center'
    popap.style.alignItems = 'center'
    popap.style.flexDirection = 'column'
    const popapTitle: HTMLElement = document.createElement('h1')
    const popapInputCon: HTMLElement = document.createElement('div')
    popapTitle.innerText = 'Please enter needed ID below'
    const popapInput: HTMLInputElement = document.createElement('input')
    popapInput.ariaPlaceholder = 'Enter Truck ID'
    const popapSubmitBtn: HTMLElement = document.createElement('button')
    const popapCloseBtn: HTMLElement = document.createElement('button')
    popapInputCon.append(popapInput, popapSubmitBtn)
    popap.append (popapCloseBtn, popapTitle, popapInputCon)
    popapCloseBtn.style.alignSelf = 'flex-end'
    popapSubmitBtn.innerText = 'Show info'
    popapCloseBtn.innerText = 'X'
    popap.style.padding = '2em'
    popapInput.style.height = '50px'
    popapInput.style.borderRadius = '10px'
    popapInput.style.width = '250px'
    popapInput.style.fontSize = '20px'
    popapInput.style.marginRight = '2em'
    popapSubmitBtn.style.padding = '1em'
    popapSubmitBtn.style.width = '100px'
    popapSubmitBtn.style.background = 'lightgreen'
    popapSubmitBtn.style.cursor = 'pointer'
    popapSubmitBtn.style.border = 'none'
    popapSubmitBtn.style.backgroundSize = 'cover'
    popap.style.justifyContent = 'space-between'
    popapBg.append(popap)
    document.body.append(popapBg)
    popapCloseBtn.addEventListener('click', () => {
        popapBg.remove()
    })
    popapSubmitBtn.addEventListener('click', () => {
        popapBg.remove()
        searchById(trucks, popapInput.value)
    })
}

const renderAlert = function(text:string):void{
    const alertBg: HTMLElement = document.createElement('div')
    alertBg.style.display = 'flex'
    alertBg.style.justifyContent = 'center'
    alertBg.style.alignItems = 'center'
    alertBg.style.position = 'absolute'
    alertBg.style.top = '0%'
    alertBg.style.left = '0%'
    alertBg.style.width = '100%'
    alertBg.style.height = '100%'
    alertBg.style.backgroundColor = 'rgba(0, 0, 0, 0.716)'
    const alert: HTMLElement = document.createElement('div')
    const alertText: HTMLElement = document.createElement('p')
    alertText.innerText = text
    alert.style.width = '400px'
    alert.style.height = '150px'
    alert.style.borderRadius = '10px'
    alert.style.fontSize = '25px'
    alert.style.textAlign = 'center'
    alert.style.display = 'flex'
    alert.style.justifyContent = 'center'
    alert.style.flexDirection = 'column'
    alert.style.background = 'black'
    alert.style.color = 'white'
    alert.style.alignItems = 'center'
    alert.style.display = 'flex'
    const alertCloseBtn: HTMLElement = document.createElement('button')
    alertCloseBtn.style.marginTop = '1.5em'
    alertCloseBtn.style.width = '100px'
    alertCloseBtn.innerText = 'OK'
    alert.append(alertText, alertCloseBtn)
    alertBg.append(alert)
    document.body.append(alertBg)
    alertCloseBtn.addEventListener('click', () => {
        alertBg.remove()
        showAllTrucksInfo()
    })
}

const searchById = function(dataArray: Truck[], id: string){
    document.querySelectorAll('#sTruck')?.forEach(el => el.remove())
    for(let i = 0; i < dataArray.length; i++){
        if(dataArray[i].id === id){
            document.querySelectorAll('tr').forEach(el => el.remove())
            document.querySelectorAll('th').forEach(el => el.remove())
            const singleTruckInfoBlock: HTMLElement = document.createElement('div')
            const singleTruckInfoBox: HTMLElement = document.createElement('div')
            const singleTruckImage: HTMLElement = document.createElement('img')
            singleTruckImage.setAttribute('src', './images/truckbtnn.png')
            singleTruckInfoBlock.style.backgroundColor = 'black'
            singleTruckInfoBlock.style.color = 'white'
            singleTruckInfoBlock.style.lineHeight = '4em'
            singleTruckInfoBlock.style.padding = '2em'
            singleTruckInfoBlock.id = 'sTruck'
            const singleId: HTMLElement = document.createElement('p')
            singleId.innerText = `ID : ${dataArray[i].id}`
            const singleName: HTMLElement = document.createElement('p')
            singleName.innerText =`Name:  ${dataArray[i].name}` 
            const singleDriver: HTMLElement = document.createElement('p')
            singleDriver.innerText = `Diver:  ${dataArray[i].driver.name} ${dataArray[i].driver.surname}`
            const singleStatus: HTMLElement = document.createElement('p')
            singleStatus.innerText = `Status:  ${dataArray[i].stringState}`
            singleTruckInfoBox.append(singleId, singleName, singleDriver, singleStatus)
            singleTruckInfoBlock.append(singleTruckInfoBox, singleTruckImage)
            singleTruckInfoBlock.style.display = 'flex'
            singleTruckInfoBlock.style.justifyContent = 'space-between'
            truckInfoBlock?.append(singleTruckInfoBlock)
            return
        } 
    }
    alert('Nothing found "#404"')
}



const drivers: Driver[] = []
RamdomDriver.createDrivers(6)

console.log(drivers)
const bmw = new Truck('BMW N345sd', drivers[0])
const volkswagen = new Truck ('Volkswagen N432nj', drivers[1])
const ford = new Truck ('Ford N122ny ', drivers[2])
const mersedes = new Truck('Mersedes N665nc', drivers[3])
const mazda = new Truck ('Mazda N511nd', drivers[4])
const mazdaSec = new Truck ('Mazda W882wa ', drivers[5])

let trucks: Truck[] = [bmw, volkswagen, ford, mersedes, mazda, mazdaSec]

allInfoBtn?.addEventListener('click', () => {
    showAllTrucksInfo()
})
singleInfoBtn?.addEventListener('click', () => {
    renderPopap()
})

const addBtn: HTMLElement | null = document.getElementById('add__btn')
const markInput = document.getElementById('mark__input') as HTMLInputElement
const removerBtn: HTMLElement | null = document.getElementById('remove__btn')
const idInput = document.getElementById('id__input') as HTMLInputElement
 

const createNewTruck = function(mark: string){
    if(markInput.value === ''){
        alert('Please Enter right mark and number with space between')
        return
    }
    RamdomDriver.createDrivers(1)
    const newTruck = new Truck(mark, drivers[drivers.length - 1])
    trucks.push(newTruck)
    renderAlert('Your Truck added successfully')
}
const removeTruck = function(){
    if(idInput.value === ''){
        alert('Please Enter right mark and number with space between')
        return
    }
    trucks.forEach(el => {
       let newTrucks = trucks.filter(el => el.id !== idInput.value)
       trucks = newTrucks
    })
    showAllTrucksInfo()
    renderAlert('Your Truck remover successfully')
}

addBtn?.addEventListener('click', () => {
    createNewTruck(markInput!.value)
    showAllTrucksInfo()
})
removerBtn?.addEventListener('click', () => {
    removeTruck()
})