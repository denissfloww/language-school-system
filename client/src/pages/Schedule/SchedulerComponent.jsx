import './index.css';
import * as React from 'react';
import { Ajax, createElement, extend, Internationalization, L10n, loadCldr } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownList, DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import {
    Day,
    DragAndDrop,
    Inject,
    Month,
    RecurrenceEditorComponent,
    Resize,
    ResourceDirective,
    ResourcesDirective,
    ScheduleComponent,
    ViewDirective,
    ViewsDirective,
    Week,
    WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import { SampleBase } from './sample-base';
import Moment from 'react-moment';
import { Locale } from './locale';
import { ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Link } from "react-router-dom";

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/ru/ca-gregorian.json'),
    require('cldr-data/main/ru/numbers.json'),
    require('cldr-data/main/ru/timeZoneNames.json'),
);

L10n.load(Locale);

export class SchedulerComponent extends SampleBase {
    weekstart = 1;

    constructor() {
        super(...arguments);
        this.scheduleData = extend([], dataSource, undefined, true);
        this.intl = new Internationalization();
        this.classTypeData = [
            {
                Name: 'Занятие',
                Id: 1,
                Color: '#36b060',
            },
            {
                Name: 'Тренинг',
                Id: 2,
                Color: '#7a3636',
            },
        ];
        this.fields = { text: 'Name', value: 'Id' };
        this.teacherData = [
            { Name: 'Иванов П.С', Id: 1 },
            { Name: 'Смирнов П.Р', Id: 2 },
        ];
        this.groupData = [
            { Name: 'Англ 1 группа', Id: 1 },
            { Name: 'Англ 2 группа', Id: 2 },
        ];
    }

    getResourceData(data) {
        const resources = this.scheduleObj.getResourceCollections().slice(-1)[0];
        return resources.dataSource.filter(resource => resource.Id === data.ClassTypeId)[0];
    }

    getHeaderStyles(data) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        } else {
            const resourceData = this.getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    }

    getHeaderTitle(data) {
        return data.elementType === 'cell' ? 'Добавить событие' : 'Информация';
    }

    getHeaderDetails(data) {
        return (
            <>
                {data.StartTime.toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                {' ('}
                <Moment format='HH:mm'>{data.StartTime}</Moment>
                {' - '}
                <Moment format='HH:mm'>{data.EndTime}</Moment>
                {')'}
            </>
        );
    }
    onActionBegin(args) {
        console.log(args.requestType);
        console.log(args.data);
    }
    getClassTypeName(data) {
        const resourceData = this.getResourceData(data);
        return resourceData.Name;
    }

    getGroupName(data) {
       const group = this.groupData.filter(group => group.Id === data.GroupId)[0];
       return group.Name
    }

    getTeacherName(data) {
        const currentTeacher = this.teacherData.filter(teacher => teacher.Id === data.TeacherId)[0];
        return currentTeacher.Name
    }

    buttonClickActions(e) {
        const quickPopup = this.scheduleObj.element.querySelector('.e-quick-popup-wrapper');
        const getSlotData = () => {
            const cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
            const addObj = {};
            addObj.Id = this.scheduleObj.getEventMaxID();
            // addObj.Subject = this.titleObj.value;
            addObj.StartTime = new Date(+cellDetails.startTime);
            addObj.EndTime = new Date(+cellDetails.endTime);
            // addObj.Description = this.notesObj.value;
            // addObj.ClassTypeId = this.eventTypeObj.value;
            return addObj;
        };
        if(e.target.id === 'mark'){
            this.props.showMarkPage();
        }

        if (e.target.id === 'add') {
            const addObj = getSlotData();
            this.scheduleObj.addEvent(addObj);
        } else if (e.target.id === 'delete') {
            const eventDetails = this.scheduleObj.activeEventData.event;
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            this.scheduleObj.deleteEvent(eventDetails, currentAction);
        } else {
            const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            const eventDetails = isCellPopup ? getSlotData() : this.scheduleObj.activeEventData.event;
            let currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        this.scheduleObj.closeQuickInfoPopup();
    }
    headerTemplate(props) {
        return (
            <div className='quick-info-header'>
                <div className='quick-info-header-content' style={this.getHeaderStyles(props)}>
                    <div className='quick-info-title'>{this.getHeaderTitle(props)}</div>
                    <div className='duration-text'>{this.getHeaderDetails(props)}</div>
                </div>
            </div>
        );
    }
    contentTemplate(props) {
        return (
            <div className='quick-info-content'>
                {props.elementType === 'cell' ? (
                    <div className='e-cell-content'>
                        {/*<div className='content-area'>*/}
                        {/*    <TextBoxComponent id='title' ref={textbox => (this.titleObj = textbox)} placeholder='Title' />*/}
                        {/*</div>*/}
                        {/*<div className='content-area'>*/}
                        {/*    <DropDownListComponent*/}
                        {/*        id='eventType'*/}
                        {/*        ref={ddl => (this.eventTypeObj = ddl)}*/}
                        {/*        dataSource={this.classTypeData}*/}
                        {/*        fields={{ text: 'Name', value: 'Id' }}*/}
                        {/*        placeholder='Choose Type'*/}
                        {/*        index={0}*/}
                        {/*        popupHeight='200px'*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className='content-area'>*/}
                        {/*    <TextBoxComponent id='notes' ref={textbox => (this.notesObj = textbox)} placeholder='Notes' />*/}
                        {/*</div>*/}
                    </div>
                ) : (
                    <div className='event-content'>
                        <div className='meeting-type-wrap'>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>Тип</label>:<span>{this.getClassTypeName(props)}</span>
                        </div>
                        <div className='meeting-subject-wrap'>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>Группа</label>:<span>{this.getGroupName(props)}</span>
                        </div>
                        <div className='notes-wrap'>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>Преподаватель</label>:<span>{this.getTeacherName(props)}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    footerTemplate(props) {
        return (
            <div className='quick-info-footer'>
                {props.elementType == 'cell' ? (
                    <div className='cell-footer'>
                        <ButtonComponent
                            id='more-details'
                            cssClass='e-flat'
                            content='Добавить'
                            isPrimary={true}
                            onClick={this.buttonClickActions.bind(this)}
                        />
                        {/*<ButtonComponent*/}
                        {/*    id='add'*/}
                        {/*    cssClass='e-flat'*/}
                        {/*    content='Добавить'*/}
                        {/*    isPrimary={true}*/}
                        {/*    onClick={this.buttonClickActions.bind(this)}*/}
                        {/*/>*/}
                    </div>
                ) : (
                    <div className='event-footer'>
                        <ButtonComponent
                          id='mark'
                          cssClass='e-flat'
                          content='Отметить'
                          onClick={this.buttonClickActions.bind(this)}
                        />
                        {/*<Button variant="text" color='inherit'>Отметить</Button>*/}
                        {/*<Button component={Link} to="/marks"*/}
                        {/*        color="secondary"*/}
                        {/*>*/}
                        {/*    Отметить*/}
                        {/*</Button>*/}
                        <ButtonComponent
                          id='delete'
                          cssClass='e-flat'
                          content='Удалить'
                          onClick={this.buttonClickActions.bind(this)}
                        />
                        <ButtonComponent
                            id='more-details'
                            cssClass='e-flat'
                            content='Изменить'
                            isPrimary={true}
                            onClick={this.buttonClickActions.bind(this)}
                        />
                    </div>
                )}
            </div>
        );
    }
    openEditor() {
        let cellData = {
            startTime: new Date(2018, 1, 15, 10, 0),
            endTime: new Date(2018, 1, 15, 11, 0),
        };
        this.scheduleObj.openEditor(cellData, 'Add');
    }

    onPopupOpen(args) {
        if (args.type === 'Editor') {
            if (!args.element.querySelector('.custom-field-row')) {
                this.teacherDropDown(args);
                this.groupDropDown(args);
            }
        }
    }

    teacherDropDown(args) {
        let row = createElement('div', { className: 'custom-field-row' });
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container = createElement('div', { className: 'custom-field-container' });
        let inputEle = createElement('input', {
            className: 'e-field',
            attrs: { name: 'TeacherId' },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let drowDownList = new DropDownList({
            dataSource: this.teacherData,
            fields: { text: 'Name', value: 'Id' },
            value: args.data.TeacherId,
            floatLabelType: 'Always',
            placeholder: 'Учитель',
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'TeacherId');
    }

    groupDropDown(args) {
        let row = createElement('div', { className: 'custom-field-row' });
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container = createElement('div', { className: 'custom-field-container' });
        let inputEle = createElement('input', {
            className: 'e-field',
            attrs: { name: 'GroupId' },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let drowDownList = new DropDownList({
            dataSource: this.groupData,
            fields: { text: 'Name', value: 'Id' },
            value: args.data.GroupId,
            floatLabelType: 'Always',
            placeholder: 'Группа',
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'GroupId');
    }

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        {/*<div style={{justifyContent:'flex-start', display:'flex', margin:'5px'}}>*/}
                        {/*    <ButtonComponent id='btn1' onClick={this.openEditor.bind(this)}>*/}
                        {/*        Добавить*/}
                        {/*    </ButtonComponent>*/}
                        {/*</div>*/}
                        <ScheduleComponent
                            id='schedule'
                            cssClass='quick-info-template'
                            ref={schedule => (this.scheduleObj = schedule)}
                            selectedDate={new Date(2020, 0, 5)}
                            eventSettings={{ dataSource: this.scheduleData }}
                            quickInfoTemplates={{
                                header: this.headerTemplate.bind(this),
                                content: this.contentTemplate.bind(this),
                                footer: this.footerTemplate.bind(this),
                            }}
                            actionBegin={this.onActionBegin.bind(this)}
                            height='100%'
                            timeFormat='HH:mm'
                            locale='ru'
                            firstDayOfWeek={this.weekstart}
                            startHour='07:00'
                            endHour='22:00'
                            popupOpen={this.onPopupOpen.bind(this)}
                        >
                            <ViewsDirective>
                                <ViewDirective option='Day' />
                                <ViewDirective option='Week' />
                                <ViewDirective option='WorkWeek' />
                                <ViewDirective option='Month' />
                            </ViewsDirective>
                            <ResourcesDirective>
                                <ResourceDirective
                                    field='ClassTypeId'
                                    title='Тип занятия'
                                    name='ClassType'
                                    textField='Name'
                                    idField='Id'
                                    colorField='Color'
                                    dataSource={this.classTypeData}
                                />
                            </ResourcesDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                        <SpeedDial
                          ariaLabel="SpeedDial basic example"
                          sx={{ position: 'absolute', bottom: 16, right: 16 }}
                          icon={<SpeedDialIcon />}
                        >
                            <SpeedDialAction
                              key={1}
                              tooltipTitle='Добавить событие'
                              icon={<SpeedDialIcon />}
                              onClick={this.openEditor.bind(this)}
                            />
                        </SpeedDial>
                    </div>
                </div>
            </div>
        );
    }
}

const dataSource = [
    {
        ClassTypeId: 1,
        Id: 1,
        Subject: 'Занятие по плану',
        Description: 'Meeting to discuss business goal of 2020.',
        StartTime: '2020-01-05T04:00:00.000Z',
        EndTime: '2020-01-05T05:30:00.000Z',
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10;",
        RecurrenceException: "20200107T040000Z",
        GroupId: 1,
        TeacherId: 1
    },
    {
        ClassTypeId: 1,
        Description: "Meeting to discuss business goal of 2020.",
        EndTime: '2020-01-07T07:30:00.000Z',
        FollowingID: null,
        GroupId: 1,
        Guid: "283b7a85-4858-ae60-e801-dc9361cb8f17",
        Id: 3,
        RecurrenceException: "20200107T040000Z",
        RecurrenceID: 1,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10;",
        StartTime: '2020-01-07T04:00:00.000Z',
        Subject: "Занятие по плану",
        TeacherId: 1
    },
    {
        ClassTypeId: 2,
        Id: 2,
        Subject: 'Тренинг',
        Description: 'Meeting to discuss business goal of 2020.',
        StartTime: '2020-01-04T04:00:00.000Z',
        EndTime: '2020-01-04T05:30:00.000Z',
        GroupId: 1,
        TeacherId: 1
    },
];
