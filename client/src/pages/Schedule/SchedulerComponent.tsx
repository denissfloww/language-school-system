import './index.css';
import * as React from 'react';
import { closest, createElement, extend, Internationalization, L10n, loadCldr } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import {
    CurrentAction,
    Day,
    DragAndDrop,
    Inject,
    Month,
    PopupOpenEventArgs,
    Resize,
    ResourceDirective,
    ResourcesDirective,
    ResourcesModel,
    ScheduleComponent,
    ViewDirective,
    ViewsDirective,
    Week,
    DragEventArgs,
    WorkWeek,
    ResizeEventArgs,
} from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, ReturnOption, WebApiAdaptor, ODataV4Adaptor, CrudOptions, DataOptions } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import Moment from 'react-moment';
import moment from 'moment';
import { Locale } from './locale';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Query } from '@syncfusion/ej2-data/src/query';
import { API_URL } from '../../constants/urls';
import { DataResult } from '@syncfusion/ej2-react-grids';
import TokenService from '../../services/TokenService';
import { END_HOUR_IN_SCHEDULE_VIEW, IS_CAN_EDIT_PREVIOUS_EVENT, START_HOUR_IN_SCHEDULE_VIEW } from '../../settings';

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/ru/ca-gregorian.json'),
    require('cldr-data/main/ru/numbers.json'),
    require('cldr-data/main/ru/timeZoneNames.json'),
);

L10n.load(Locale);

class TestAdaptor extends UrlAdaptor {
    public insert(dm: DataManager, data: Object, tableName: string, query: Query) {
        return super.insert(dm, data, tableName, query);
    }

    public update(dm: DataManager, keyField: string, data: Object, tableName: string, query: Query) {
        return super.update(dm, keyField, data, tableName, query);
    }

    processQuery(dm: DataManager, query: Query, hierarchyFilters?: Object[]): Object {
        return super.processQuery(dm, query, hierarchyFilters);
    }

    batchRequest(dm: DataManager, changes: CrudOptions, e: Object, query: Query, original?: Object): Object {
        console.log(original);
        return super.batchRequest(dm, changes, e, query, original);
    }

    // processResponse(data: DataResult, ds?: DataOptions, query?: Query, xhr?: XMLHttpRequest, request?: Object, changes?: CrudOptions): DataResult {
    //     console.log(changes)
    //     return super.processResponse(data, ds, query, xhr, request, changes);
    // }

    beforeSend(dm: DataManager, request: XMLHttpRequest) {
        super.beforeSend(dm, request);
    }
}

export class SchedulerComponent extends SampleBase {
    weekstart = 1;
    private scheduleObj: ScheduleComponent;
    private intl: any;
    private dataManager: DataManager;

    constructor(props: any) {
        // @ts-ignore
        super(...arguments);
        this.intl = new Internationalization();
    }

    componentDidMount() {
        this.dataManager = new DataManager({
            url: `${API_URL}/schedule/loadData`,
            crudUrl: `${API_URL}/schedule/updateData`,
            adaptor: new TestAdaptor(),
            headers: [{ Authorization: `Bearer ${TokenService.getAccessToken()}` }],
        });
    }

    componentDidUpdate() {}

    getResourceData(data: Record<string, any>): Record<string, any> {
        const resources: ResourcesModel = this.scheduleObj.getResourceCollections().slice(-1)[0];
        // @ts-ignore
        return resources.dataSource.filter(resource => resource.Id === data.ClassTypeId)[0];
    }

    getHeaderStyles(data: Record<string, any>) {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        } else {
            const resourceData = this.getResourceData(data);
            return { background: resourceData.Color, color: '#FFFFFF' };
        }
    }

    getHeaderTitle(data: Record<string, any>) {
        return data.elementType === 'cell' ? 'Добавить событие' : 'Информация';
    }

    getHeaderDetails(data: { [key: string]: Date }) {
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
    onActionBegin(args: Record<string, any>) {
        // // if (!this.scheduleObj.isSlotAvailable(args.data)) {
        // //     args.cancel = true;
        // // }
        //
        // if (args.requestType === 'eventCreate' && (args.data).length > 0) {
        //     let eventData = args.data[0];
        //     let eventField = this.scheduleObj.eventFields;
        //     let startDate = eventData[eventField.startTime];
        //     let endDate = eventData[eventField.endTime];
        //     args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
        //     console.log(args.requestType);
        //     console.log(args.data);
        // }

        if (!this.props.isCanEdit) {
            if (!(args.requestType == "viewNavigate" || args.requestType == "dateNavigate")) {
                args.cancel = true;
            }
        }

        console.log(args.requestType);
        console.log(args);
    }
    getClassTypeName(data: any) {
        const resourceData = this.getResourceData(data);
        return resourceData.Name;
    }

    getGroupName(data: any) {
        const group = this.props.groups.filter((group: any) => group.Id === data.GroupId)[0];
        return group.Name;
    }

    buttonClickActions(e: any) {
        const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
        const getSlotData = () => {
            const cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
            const addObj: Record<string, any> = {};
            addObj.Id = this.scheduleObj.getEventMaxID();
            // addObj.Subject = this.titleObj.value;
            addObj.StartTime = new Date(+cellDetails.startTime);
            addObj.EndTime = new Date(+cellDetails.endTime);
            // addObj.Description = this.notesObj.value;
            // addObj.ClassTypeId = this.eventTypeObj.value;
            return addObj;
        };

        if (e.target.id === 'add') {
            const addObj = getSlotData();
            this.scheduleObj.addEvent(addObj);
            console.log(addObj);
        } else if (e.target.id === 'delete') {
            const eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event;
            let currentAction: CurrentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            console.log(eventDetails);
            this.scheduleObj.deleteEvent(eventDetails, currentAction);
        } else {
            const isCellPopup: boolean = (quickPopup.firstElementChild as HTMLElement).classList.contains('e-cell-popup');
            const eventDetails = isCellPopup ? getSlotData() : this.scheduleObj.activeEventData.event;
            let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            console.log(eventDetails);
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        this.scheduleObj.closeQuickInfoPopup();
    }

    headerTemplate(props: { [key: string]: Date }) {
        return (
            <div className='quick-info-header'>
                <div className='quick-info-header-content' style={this.getHeaderStyles(props)}>
                    <div className='quick-info-title'>{this.getHeaderTitle(props)}</div>
                    <div className='duration-text'>{this.getHeaderDetails(props)}</div>
                </div>
            </div>
        );
    }

    contentTemplate(props: { [key: string]: string }) {
        return (
            <div className='quick-info-content'>
                {props.elementType === 'cell' ? (
                    <div className='e-cell-content'></div>
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
                    </div>
                )}
            </div>
        );
    }
    footerTemplate(props: Record<string, any>) {
        return (
            <div className='quick-info-footer'>
                {props.elementType == 'cell' ? (
                    <></>
                ) : (
                    <div className='event-footer'>
                        <ButtonComponent id='mark' cssClass='e-flat' content='Отметить' onClick={this.buttonClickActions.bind(this)} />
                        <ButtonComponent id='delete' cssClass='e-flat' content='Удалить' onClick={this.buttonClickActions.bind(this)} />
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

    private tooltipTemplate(props: any) {
        return (
            <div className='tooltip-wrap'>
                <div className='content-area'>
                    <div className='event-name'>{props.Subject}</div>
                    <div className='class-type'>
                        Тип&nbsp;:&nbsp;<span>{this.getClassTypeName(props)}</span>
                    </div>
                    <div className='time'>Начало&nbsp;:&nbsp;{props.StartTime.toLocaleString()}</div>
                    <div className='time'>Конец&nbsp;:&nbsp;{props.EndTime.toLocaleString()}</div>
                    <div className='time'>Учитель&nbsp;:&nbsp;{this.getTeacherByGroupId(props.GroupId)}</div>
                </div>
            </div>
        );
    }

    getTeacherByGroupId(groupId: number) {
        const group = this.props.groups.filter((group: any) => group.Id === groupId)[0];
        return group.TeacherName;
    }

    openEditor() {
        let startTime = moment().add(1, 'hours');
        let endTime = moment().add(2, 'hours');
        let cellData = {
            startTime: startTime.toDate(),
            endTime: endTime.toDate(),
        };

        this.scheduleObj.openEditor(cellData, 'Add');
    }

    private onDragStart(args: DragEventArgs): void {
        if (!this.props.isCanEdit) {
            args.cancel = true;
        }
        if (!IS_CAN_EDIT_PREVIOUS_EVENT) {
            if (args?.data?.StartTime < moment().toDate()) {
                args.cancel = true;
            }
        }
    }

    private onResizeStart(args: ResizeEventArgs): void {
        if (!this.props.isCanEdit) {
            args.cancel = true;
        }
        if (!IS_CAN_EDIT_PREVIOUS_EVENT) {
            if (args?.data?.StartTime < moment().toDate()) {
                args.cancel = true;
            }
        }
    }

    onPopupOpen(args: PopupOpenEventArgs) {
        if (!this.props.isCanEdit) {
            args.cancel = true;
        }

        if (!IS_CAN_EDIT_PREVIOUS_EVENT) {
            if (args?.data?.name === 'cellClick') {
                if (args.data.startTime < moment().toDate()) {
                    args.cancel = true;
                }
            } else {
                if (args?.data?.StartTime < moment().toDate()) {
                    args.cancel = true;
                }
            }
        }

        if (args.type === 'QuickInfo') {
            args.cancel = true;
        }
        if (args.type === 'Editor') {
            if (!args.element.querySelector('.custom-field-row')) {
                this.groupDropDown(args);
            }

            let formElement: any = args.element.querySelector('.e-schedule-form');
            let validator = formElement.ej2_instances[0];
            validator.addRules('GroupId', { required: [true, 'Обязательно для заполнения!'] });
            validator.addRules('Subject', { required: [true, 'Обязательно для заполнения!'] });
        }
    }

    onRenderCell(args: any) {
        if (!IS_CAN_EDIT_PREVIOUS_EVENT) {
            if (args.date < moment().toDate()) {
                args.element.classList.add('e-disableCell');
            }
        }
    }

    // teacherDropDown(args: any) {
    //     let row = createElement('div', { className: 'custom-field-row' });
    //     let formElement = args.element.querySelector('.e-schedule-form');
    //     formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
    //     let container = createElement('div', { className: 'custom-field-container' });
    //     let inputEle = createElement('input', {
    //         className: 'e-field',
    //         attrs: { name: 'TeacherId' },
    //     });
    //     container.appendChild(inputEle);
    //     row.appendChild(container);
    //     let drowDownList = new DropDownList({
    //         dataSource: this.teacherData,
    //         fields: { text: 'Name', value: 'Id' },
    //         value: args.data.TeacherId,
    //         floatLabelType: 'Always',
    //         placeholder: 'Учитель',
    //     });
    //     drowDownList.appendTo(inputEle);
    //     inputEle.setAttribute('name', 'TeacherId');
    // }

    onDropChange(args: any) {
        if (document.querySelectorAll('.e-tooltip-wrap')[0] !== undefined) {
            (document.querySelectorAll('.e-tooltip-wrap')[0] as any).style.display = 'none';
        }
    }

    groupDropDown(args: any) {
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
            dataSource: this.props.groups,
            fields: { text: 'Name', value: 'Id' },
            value: args.data.GroupId,
            floatLabelType: 'Always',
            placeholder: 'Группа',
            change: this.onDropChange,
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'GroupId');
    }

    render() {
        return (
            <>
                <div className='schedule-control-section'>
                    <div className='col-lg-12 control-section'>
                        <div className='control-wrapper'>
                            <ScheduleComponent
                                id='schedule'
                                cssClass='quick-info-template'
                                ref={(schedule: any) => (this.scheduleObj = schedule)}
                                selectedDate={moment().toDate()}
                                eventSettings={{
                                    dataSource: this.dataManager,
                                    enableTooltip: true,
                                    tooltipTemplate: this.tooltipTemplate.bind(this) as any,
                                }}
                                quickInfoTemplates={{
                                    header: this.headerTemplate.bind(this) as any,
                                    content: this.contentTemplate.bind(this) as any,
                                    footer: this.footerTemplate.bind(this) as any,
                                }}
                                actionBegin={this.onActionBegin.bind(this)}
                                renderCell={this.onRenderCell.bind(this)}
                                height='100%'
                                timeFormat='HH:mm'
                                dragStart={this.onDragStart.bind(this)}
                                resizeStart={this.onResizeStart.bind(this)}
                                locale='ru'
                                firstDayOfWeek={this.weekstart}
                                startHour={START_HOUR_IN_SCHEDULE_VIEW}
                                endHour={END_HOUR_IN_SCHEDULE_VIEW}
                                popupOpen={this.onPopupOpen.bind(this)}
                            >
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='Week' />
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
                                        dataSource={this.props.lessonTypes}
                                    />
                                </ResourcesDirective>
                                <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
                            </ScheduleComponent>
                            {this.props.isCanEdit ? (
                                <SpeedDial
                                    ariaLabel='SpeedDial basic example'
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
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
