"use strict";
const truckInfoBlock = document.getElementById('truck__info');
const truckInfoTable = document.getElementById('truck__info__table');
const allInfoBtn = document.getElementById('truks__status');
const singleInfoBtn = document.getElementById('single__truk__status');
class Driver {
    constructor(name, surname, age, experience) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.experience = experience;
    }
}
class RamdomDriver {
    static createRandomDriver() {
        let names = ['Arthur', 'Bill', 'John', 'Rick', 'Tom', 'Gerald', 'Kurise', 'Linbaba', 'Spike', 'Victor', 'Ron', 'Harry', 'Dorian', 'Sofi', 'Charles', 'Islam', 'Tai', 'Glover'];
        let surnames = ['Morgan', 'Butcher', 'Maclein', 'Grimes', 'Hardy', 'Makise', 'Prat', 'Bibop', 'Coi', 'Rivera', 'Whisly', 'Potter', 'Gray', 'Mur', 'Oliveira', 'Machachev', 'Tuivasa', 'Teishaira'];
        let randomName = Math.floor(Math.random() * names.length);
        let randomSurname = Math.floor(Math.random() * surnames.length);
        let randomAge = Math.floor(Math.random() * (65 - 18) + 18);
        let randomExp = Math.floor(Math.random() * ((randomAge - 16) - 3) + 3);
        return new Driver(names[randomName], surnames[randomSurname], randomAge, randomExp);
    }
    static createDrivers(amount) {
        for (let i = 0; i < amount; i++)
            drivers.push(this.createRandomDriver());
    }
}
class ITruckState {
}
class OnBase extends ITruckState {
    constructor() {
        super(...arguments);
        this.stringState = 'Base';
    }
    changeDriver(truck) {
        let newDriver = RamdomDriver.createRandomDriver();
        truck.driver = newDriver;
        renderAlert(`Your new driver is ${newDriver.name} ${newDriver.surname} !`);
    }
    startRun(truck) {
        truck.changeState(new OnRun());
        truck.stringState = truck.state.stringState;
        renderAlert('Truck is on run Successfully !');
    }
    startRepair(truck) {
        truck.changeState(new OnRepear());
        truck.stringState = truck.state.stringState;
        renderAlert('Truck is on repair Successfully !');
    }
    returnToBase(truck) {
        renderAlert('Truck is already on base');
    }
}
class OnRun extends ITruckState {
    constructor() {
        super(...arguments);
        this.stringState = 'Run';
    }
    changeDriver(truck) {
        renderAlert('Unfortunately u can not change driver while truck is on run !');
    }
    startRun(truck) {
        renderAlert('Truck is already on run');
    }
    startRepair(truck) {
        truck.changeState(new OnRepear());
        truck.stringState = truck.state.stringState;
        renderAlert('Truck is on repair Successfully !');
    }
    returnToBase(truck) {
        truck.changeState(new OnBase());
        truck.stringState = truck.state.stringState;
        renderAlert('Truck returned to base Successfully !');
    }
}
class OnRepear extends ITruckState {
    constructor() {
        super(...arguments);
        this.stringState = 'Repair';
    }
    changeDriver(truck) {
        renderAlert('Unfortunately u can not change driver while truck is on repair !');
    }
    startRun(truck) {
        let random = Math.floor(Math.random() * 2);
        truck.changeState(random === 2 ? new OnBase() : new OnRun());
        truck.stringState = truck.state.stringState;
    }
    startRepair(truck) {
        renderAlert('Truck is already on repair');
    }
    returnToBase(truck) {
        renderAlert('Unfortunately u can not change driver while truck is on repair !');
    }
}
class Truck {
    constructor(name, driver) {
        this.name = name;
        this.driver = driver;
        this.state = new OnBase();
        this.stringState = this.state.stringState;
        this.id = this.createId();
    }
    changeState(state) {
        this.state = state;
    }
    createId() {
        let result = `${this.driver.name[0]}${Math.floor(Math.random() * (10000 - 1000) + 1000)}${this.driver.surname[0]}${Math.floor(Math.random() * (1000 - 100) + 100)}`;
        return result;
    }
    changeDriver() {
        this.state.changeDriver(this);
    }
    startRun() {
        this.state.startRun(this);
    }
    startRepair() {
        this.state.startRepair(this);
    }
    returnToBase() {
        this.state.returnToBase(this);
    }
}
const showAllTrucksInfo = function () {
    var _a;
    (_a = document.querySelectorAll('#sTruck')) === null || _a === void 0 ? void 0 : _a.forEach(el => el.remove());
    document.querySelectorAll('tr').forEach(el => el.remove());
    document.querySelectorAll('th').forEach(el => el.remove());
    const tableHeadId = document.createElement('th');
    tableHeadId.innerText = 'ID';
    const tableHeadName = document.createElement('th');
    tableHeadName.innerText = 'NAME';
    const tableHeadDriver = document.createElement('th');
    tableHeadDriver.innerText = 'DRIVER';
    const tableHeadStatus = document.createElement('th');
    tableHeadStatus.innerText = 'STATUS';
    const tableHeadControl = document.createElement('th');
    tableHeadControl.innerText = 'CONTROL';
    truckInfoTable === null || truckInfoTable === void 0 ? void 0 : truckInfoTable.append(tableHeadId, tableHeadName, tableHeadDriver, tableHeadStatus, tableHeadControl);
    trucks.forEach(el => {
        const truckCon = document.createElement('tr');
        const truckId = document.createElement('td');
        const removeTruck = document.createElement('button');
        truckId.innerText = el.id;
        const truckName = document.createElement('td');
        truckName.innerText = el.name;
        const driverName = document.createElement('td');
        driverName.innerText = `${el.driver.name}  ${el.driver.surname}`;
        const truckStatus = document.createElement('td');
        truckStatus.innerText = el.stringState;
        truckCon.append(truckId, truckName, driverName, truckStatus);
        truckCon.style.fontSize = '15px';
        truckInfoTable === null || truckInfoTable === void 0 ? void 0 : truckInfoTable.append(truckCon);
        const changeDriverBtn = document.createElement('button');
        changeDriverBtn.innerHTML = 'Change Driver <i class="fa-solid fa-id-card"></i>';
        const startRunBtn = document.createElement('button');
        startRunBtn.innerHTML = 'Start run <i class="fa-solid fa-truck-moving"></i>';
        const startRepairBtn = document.createElement('button');
        startRepairBtn.innerHTML = 'Start repair <i class="fa-solid fa-screwdriver-wrench"></i>';
        const returnToBaseBtn = document.createElement('button');
        returnToBaseBtn.innerHTML = 'Back to base <i class="fa-solid fa-house"></i>';
        const truckControl = document.createElement('td');
        const truckControlsCon = document.createElement('div');
        const showControlPanel = document.createElement('button');
        const closeControlPanel = document.createElement('button');
        closeControlPanel.style.border = 'none';
        closeControlPanel.innerText = 'x';
        changeDriverBtn.addEventListener('click', () => {
            el.changeDriver();
        });
        startRunBtn.addEventListener('click', () => {
            el.startRun();
        });
        startRepairBtn.addEventListener('click', () => {
            el.startRepair();
        });
        returnToBaseBtn.addEventListener('click', () => {
            el.returnToBase();
        });
        showControlPanel.addEventListener('click', () => {
            truckControl.style.backgroundColor = 'black';
            truckControlsCon.style.height = 'auto';
            showControlPanel.style.opacity = '0';
        });
        closeControlPanel.addEventListener('click', () => {
            truckControl.style.backgroundColor = 'transparent';
            truckControlsCon.style.height = '0px';
            showControlPanel.style.opacity = '1';
        });
        showControlPanel.innerText = 'Show options';
        showControlPanel.style.cursor = 'pointer';
        truckControlsCon.className = 'truck__control__buttons';
        truckControlsCon.append(closeControlPanel, changeDriverBtn, startRunBtn, startRepairBtn, returnToBaseBtn);
        truckControlsCon.style.height = '0px';
        truckControlsCon.style.overflow = 'hidden';
        truckControl.append(truckControlsCon);
        truckControl.append(showControlPanel);
        truckCon.append(truckControl);
    });
};
const renderPopap = function () {
    const popapBg = document.createElement('div');
    popapBg.style.display = 'flex';
    popapBg.style.justifyContent = 'center';
    popapBg.style.alignItems = 'center';
    popapBg.style.position = 'absolute';
    popapBg.style.top = '0%';
    popapBg.style.left = '0%';
    popapBg.style.width = '100%';
    popapBg.style.height = '100%';
    popapBg.style.backgroundColor = 'rgba(0, 0, 0, 0.716)';
    const popap = document.createElement('div');
    popap.style.width = '500px';
    popap.style.height = '200px';
    popap.style.backgroundColor = 'white';
    popap.style.borderRadius = '10px';
    popap.style.display = 'flex';
    popap.style.justifyContent = 'center';
    popap.style.alignItems = 'center';
    popap.style.flexDirection = 'column';
    const popapTitle = document.createElement('h1');
    const popapInputCon = document.createElement('div');
    popapTitle.innerText = 'Please enter needed ID below';
    const popapInput = document.createElement('input');
    popapInput.ariaPlaceholder = 'Enter Truck ID';
    const popapSubmitBtn = document.createElement('button');
    const popapCloseBtn = document.createElement('button');
    popapInputCon.append(popapInput, popapSubmitBtn);
    popap.append(popapCloseBtn, popapTitle, popapInputCon);
    popapCloseBtn.style.alignSelf = 'flex-end';
    popapSubmitBtn.innerText = 'Show info';
    popapCloseBtn.innerText = 'X';
    popap.style.padding = '2em';
    popapInput.style.height = '50px';
    popapInput.style.borderRadius = '10px';
    popapInput.style.width = '250px';
    popapInput.style.fontSize = '20px';
    popapInput.style.marginRight = '2em';
    popapSubmitBtn.style.padding = '1em';
    popapSubmitBtn.style.width = '100px';
    popapSubmitBtn.style.background = 'lightgreen';
    popapSubmitBtn.style.cursor = 'pointer';
    popapSubmitBtn.style.border = 'none';
    popapSubmitBtn.style.backgroundSize = 'cover';
    popap.style.justifyContent = 'space-between';
    popapBg.append(popap);
    document.body.append(popapBg);
    popapCloseBtn.addEventListener('click', () => {
        popapBg.remove();
    });
    popapSubmitBtn.addEventListener('click', () => {
        popapBg.remove();
        searchById(trucks, popapInput.value);
    });
};
const renderAlert = function (text) {
    const alertBg = document.createElement('div');
    alertBg.style.display = 'flex';
    alertBg.style.justifyContent = 'center';
    alertBg.style.alignItems = 'center';
    alertBg.style.position = 'absolute';
    alertBg.style.top = '0%';
    alertBg.style.left = '0%';
    alertBg.style.width = '100%';
    alertBg.style.height = '100%';
    alertBg.style.backgroundColor = 'rgba(0, 0, 0, 0.716)';
    const alert = document.createElement('div');
    const alertText = document.createElement('p');
    alertText.innerText = text;
    alert.style.width = '400px';
    alert.style.height = '150px';
    alert.style.borderRadius = '10px';
    alert.style.fontSize = '25px';
    alert.style.textAlign = 'center';
    alert.style.display = 'flex';
    alert.style.justifyContent = 'center';
    alert.style.flexDirection = 'column';
    alert.style.background = 'black';
    alert.style.color = 'white';
    alert.style.alignItems = 'center';
    alert.style.display = 'flex';
    const alertCloseBtn = document.createElement('button');
    alertCloseBtn.style.marginTop = '1.5em';
    alertCloseBtn.style.width = '100px';
    alertCloseBtn.innerText = 'OK';
    alert.append(alertText, alertCloseBtn);
    alertBg.append(alert);
    document.body.append(alertBg);
    alertCloseBtn.addEventListener('click', () => {
        alertBg.remove();
        showAllTrucksInfo();
    });
};
const searchById = function (dataArray, id) {
    var _a;
    (_a = document.querySelectorAll('#sTruck')) === null || _a === void 0 ? void 0 : _a.forEach(el => el.remove());
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id === id) {
            document.querySelectorAll('tr').forEach(el => el.remove());
            document.querySelectorAll('th').forEach(el => el.remove());
            const singleTruckInfoBlock = document.createElement('div');
            const singleTruckInfoBox = document.createElement('div');
            const singleTruckImage = document.createElement('img');
            singleTruckImage.setAttribute('src', './images/truckbtnn.png');
            singleTruckInfoBlock.style.backgroundColor = 'black';
            singleTruckInfoBlock.style.color = 'white';
            singleTruckInfoBlock.style.lineHeight = '4em';
            singleTruckInfoBlock.style.padding = '2em';
            singleTruckInfoBlock.id = 'sTruck';
            const singleId = document.createElement('p');
            singleId.innerText = `ID : ${dataArray[i].id}`;
            const singleName = document.createElement('p');
            singleName.innerText = `Name:  ${dataArray[i].name}`;
            const singleDriver = document.createElement('p');
            singleDriver.innerText = `Diver:  ${dataArray[i].driver.name} ${dataArray[i].driver.surname}`;
            const singleStatus = document.createElement('p');
            singleStatus.innerText = `Status:  ${dataArray[i].stringState}`;
            singleTruckInfoBox.append(singleId, singleName, singleDriver, singleStatus);
            singleTruckInfoBlock.append(singleTruckInfoBox, singleTruckImage);
            singleTruckInfoBlock.style.display = 'flex';
            singleTruckInfoBlock.style.justifyContent = 'space-between';
            truckInfoBlock === null || truckInfoBlock === void 0 ? void 0 : truckInfoBlock.append(singleTruckInfoBlock);
            return;
        }
    }
    alert('Nothing found "#404"');
};
const drivers = [];
RamdomDriver.createDrivers(6);
console.log(drivers);
const bmw = new Truck('BMW N345sd', drivers[0]);
const volkswagen = new Truck('Volkswagen N432nj', drivers[1]);
const ford = new Truck('Ford N122ny ', drivers[2]);
const mersedes = new Truck('Mersedes N665nc', drivers[3]);
const mazda = new Truck('Mazda N511nd', drivers[4]);
const mazdaSec = new Truck('Mazda W882wa ', drivers[5]);
let trucks = [bmw, volkswagen, ford, mersedes, mazda, mazdaSec];
allInfoBtn === null || allInfoBtn === void 0 ? void 0 : allInfoBtn.addEventListener('click', () => {
    showAllTrucksInfo();
});
singleInfoBtn === null || singleInfoBtn === void 0 ? void 0 : singleInfoBtn.addEventListener('click', () => {
    renderPopap();
});
const addBtn = document.getElementById('add__btn');
const markInput = document.getElementById('mark__input');
const removerBtn = document.getElementById('remove__btn');
const idInput = document.getElementById('id__input');
const createNewTruck = function (mark) {
    if (markInput.value === '') {
        alert('Please Enter right mark and number with space between');
        return;
    }
    RamdomDriver.createDrivers(1);
    const newTruck = new Truck(mark, drivers[drivers.length - 1]);
    trucks.push(newTruck);
    renderAlert('Your Truck added successfully');
};
const removeTruck = function () {
    if (idInput.value === '') {
        alert('Please Enter right mark and number with space between');
        return;
    }
    trucks.forEach(el => {
        let newTrucks = trucks.filter(el => el.id !== idInput.value);
        trucks = newTrucks;
    });
    showAllTrucksInfo();
    renderAlert('Your Truck remover successfully');
};
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', () => {
    createNewTruck(markInput.value);
    showAllTrucksInfo();
});
removerBtn === null || removerBtn === void 0 ? void 0 : removerBtn.addEventListener('click', () => {
    removeTruck();
});
