/**
 * A day to change in the selector
 */
var Day = React.createClass({
  getInitialState: function() {
    return {
      selected: this.props.selected,
      classDate: this.props.selected ? "dateElementSelected" : "dateElement",
      classDayNumber: this.props.selected ? "dayNumberSelected" : "dayNumber",
      classDayMonth: this.props.selected ? "dayMonthSelected" : "dayMonth",
      classDayName: this.props.selected ? "dayNameSelected" : "dayName"
    };
    this.props.updateSelectedDateElement(1,[]);
  },
  /**
   * Day selected
   */
  selectDay: function(){
    var slotsSelected = this.props.slots !==undefined ? this.props.slots : [];
    this.props.updateSelectedDateElement(this.key,slotsSelected);
  },
  /**
   * Change the state when the date changes
   */
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      selected: nextProps.selected,
      classDate: nextProps.selected ? "dateElementSelected" : "dateElement",
      classDayNumber: nextProps.selected ? "dayNumberSelected" : "dayNumber",
      classDayMonth: nextProps.selected ? "dayMonthSelected" : "dayMonth",
      classDayName: nextProps.selected ? "dayNameSelected" : "dayName"
    });
  },
  render: function() {
    return (
      <div className={this.state.classDate} onClick={this.selectDay}>
        <p className={this.state.classDayName}>{this.props.dayName}</p>
        <p className={this.state.classDayNumber}>{this.props.dayNumber}</p>
        <p className={this.state.classDayMonth}>{this.props.dayMonth}</p>
        { this.state.selected ? <div className="flecha"></div> : null }
      </div>
    )
  }
});
/**
 * Constant with the different slots allowed
 */
const timeslotsdata = [ {
                    slot: "Morning",
                    hours: "08:00 - 12:00"
                  }, {
                    slot: "Afertnoon",
                    hours: "12:00 - 18:00"
                  }, {
                    slot: "Evening",
                    hours: "18:00 - 22:00"
                  } ];
/**
 * List of the next five days
 */
var Dates = React.createClass({
  /**
   * Initialize the state with five dates from today
   */
  getInitialState: function() {
    return{
      data: [
        {
          id: 1,
          dayName: moment().format('ddd').toUpperCase(),
          dayNumber: moment().date(),
          dayMonth: moment().format('MMM').toUpperCase(),
          dayYear: moment().format('YYYY'),
          selected:true,
          slotsSelected:[]
        },
        {
          id: 2,
          dayName: moment().add(1, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(1, 'days').date(),
          dayMonth: moment().add(1, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(1, 'days').format('YYYY'),
          selected:false,
          slotsSelected:[]
        },
        {
          id: 3,
          dayName: moment().add(2, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(2, 'days').date(),
          dayMonth: moment().add(2, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(2, 'days').format('YYYY'),
          selected:false,
          slotsSelected:[]
        },
        {
          id: 4,
          dayName: moment().add(3, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(3, 'days').date(),
          dayMonth: moment().add(3, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(3, 'days').format('YYYY'),
          selected:false,
          slotsSelected:[]
        },
        {
          id: 5,
          dayName: moment().add(4, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(4, 'days').date(),
          dayMonth: moment().add(4, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(4, 'days').format('YYYY'),
          selected:false,
          slotsSelected:[]
        }
      ]
    };
  },
  /**
   * Store the date changed
   */
  handleDayChange: function(value,slots) {
    var dateSelected = null;
    var dates = this.state.data.filter(function(item) {
        if(item.id === value){
          item.selected = true;
          dateSelected = item;
          dateSelected.slotsSelected = slots;
        }else{
          item.selected = false;
        }
        return item;
      });
    this.setState({data:dates});
    this.props.updateSelectedDate(dateSelected);
  },
  /**
   * Store the slots changed
   */
  handleSlotsChange: function(value) {
    this.props.updateSlotsSelected(value);
  },
  render: function() {
    var textExplain = "We'll walk to the agent and book it in.";
    return (
      <div>
        <h3 className="adviceText">
          Pick times that suit you.
        </h3>
        <p className="adviceExplain">{textExplain}</p>
        <div id="container" className="containerDatesList">
          <div id="inner"  className="innerDatesList">
            {this.state.data.map(function(day) {
              var dateSelected = this.handleDayChange.bind(this, day.id,day.slotsSelected);
              return (
                <Day
                    selected={day.selected}
                    dayMonth={day.dayMonth}
                    dayNumber={day.dayNumber}
                    dayName={day.dayName}
                    slots={day.slotsSelected}
                    key={day.id}
                    updateSelectedDateElement={dateSelected}/>
              );
            },this)}
          </div>
        </div>
        {timeslotsdata.map(function(slot) {
          var slotSelected = this.handleSlotsChange.bind(this, slot.slot);
          var dateSelected = this.props.selectedDate;
          return (
            <Slot slotDate={dateSelected} name={slot.slot} desc={slot.hours} key={slot.slot+dateSelected.dayNumber} updateSlotSelected={slotSelected}/>
          );
        },this)}
      </div>
    );
  }
});
/**
 * Slot of time
 */
var Slot = React.createClass({
  getInitialState: function() {
    var slotSelected = false;
    var slotKey = this.props.name;
    this.props.slotDate.slotsSelected.filter(function(slotItem) {
      if(slotItem!==undefined && slotItem===slotKey) slotSelected = true;
    });
    return {
      classSlot:slotSelected?"slotSelected":"slot",
      selected:slotSelected,
      slotDate:this.props.slotDate
    };
  },
  /**
   * Change the state when the slot changes
   */
  componentWillReceiveProps: function(nextProps) {
    var slotSelected = false;
    var slotKey = this.props.name;
    nextProps.slotDate.slotsSelected.filter(function(slotItem) {
      if(slotItem!==undefined && slotItem===slotKey) slotSelected = true;
    });
    this.setState({
      classSlot: slotSelected ? "slotSelected" : "slot",
      selected: slotSelected,
      slotDate:nextProps.slotDate
    });
  },
  /**
   * Make the changes and store the slot selected/deselected
   */
  selectedSlot: function() {
    var selectedDate = this.state.slotDate;
    var slotSelected = false;
    var slotKey = this.props.name;
    selectedDate.slotsSelected.filter(function(slotItem) {
      if(slotItem!=undefined && slotItem===slotKey) slotSelected = true;
    });
    if(!slotSelected){
      selectedDate.slotsSelected.push(this.props.name);
    }else{
      selectedDate.slotsSelected.pop(this.props.name);
    }
    this.setState({
      classSlot:this.state.classSlot==='slot'?'slotSelected':'slot',
      selected:this.state.selected ? true : false,
      slotDate:selectedDate
    });
    this.props.updateSlotSelected(this.props);
  },
  render: function() {
    return (
      <div className={this.state.classSlot} onClick={this.selectedSlot}>
        <h2 className="slotText">
          {this.props.name} ({this.props.desc})
        </h2>

      </div>
    );
  }
});
/**
 * Lit of time slots to select them
 */
var TimeSlotList = React.createClass({
  getInitialState: function() {
    return {
      slotsData:[],
      dateSelected:{
        id: 1,
        dayName: moment().format('ddd').toUpperCase(),
        dayNumber: moment().date(),
        dayMonth: moment().format('MMM').toUpperCase(),
        dayYear: moment().format('YYYY'),
        selected:true,
        slotsSelected:[]
      },
      classSubmitbutton:'submitButton',
      textSubmitbutton:'SELECT MULTIPLE TIMESLOTS'
    };
  },
  /**
   * Store the slot selected or remove it from the slot's list
   */
  handleSlotChange: function(value){
    console.log('handleSlotChange:value:'+JSON.stringify(value));
    var slotData = timeslotsdata.filter(function(item) {
      console.log('handleSlotChange:timeslotsdata:'+JSON.stringify(item));
        if(item.slot === value){
          return item;
        }
      })[0];
    var slot = {
      slot: slotData.slot,
      hours: slotData.hours,
      slotDate: this.state.dateSelected.dayNumber,
      slotMonth: this.state.dateSelected.dayMonth,
      slotYear: this.state.dateSelected.dayYear
    };
    var slots = this.state.slotsData;
    var addSlot = true;
    var slotId = slot.slotDate+'_'+slot.slot;
    console.log('handleSlotChange:this.state.slotsData:'+JSON.stringify(this.state.slotsData));
    this.state.slotsData.filter(function(item) {
      var slotItemId = item.slotDate+'_'+item.slot;
        console.log(slotId + '===' + slotItemId);
        if(slotId === slotItemId){
            addSlot = false;
        }
    });
    if(addSlot) {
      console.log('handleSlotChange:push');
      slots.push(slot);
    }else{
      console.log('handleSlotChange:pop');
      slots.pop(slot);
    }
    console.log('handleSlotChange:slots:'+JSON.stringify(slots));
    this.setState({
      data:slots,
      dateSelected:this.state.dateSelected,
      classSubmitbutton:slots.length>0?'submitButtonSelected':'submitButton',
      textSubmitbutton:slots.length>0?'SEND '+slots.length+' TIMESLOTS':'SELECT MULTIPLE TIMESLOTS'
    });
  },
  /**
   * Store the date changed in the time slot selector
   */
  handleDaySelected:function (value){
    this.setState({
      slotsData:this.state.slotsData,
      dateSelected:value,
      classSubmitbutton:this.state.slotsData.length>0?'submitButtonSelected':'submitButton',
      textSubmitbutton:this.state.slotsData.length>0?'SEND '+this.state.slotsData.length+' TIMESLOTS':'SELECT MULTIPLE TIMESLOTS'
    });
  },
  /**
   * Return the data from the time slot selector to the parent Component
   */
  returnSlotsData:function (){
    this.props.submitData(this.state.slotsData);
  },
  render: function() {
    return (
      <div className="timeSlotList">
        <input
          className="cancelButton"
          type="button"
          value="V"
          onClick={this.props.cancelData}
        />
        <Dates selectedDate={this.state.dateSelected} updateSelectedDate={this.handleDaySelected} updateSlotsSelected={this.handleSlotChange}/>
        <input
          className={this.state.classSubmitbutton}
          type="button"
          value={this.state.textSubmitbutton}
          onClick={this.returnSlotsData}
        />
      </div>
    );
  }
});
/**
 * Creates the whole componet to use in any web page
 */
var Calendar = React.createClass({
  getInitialState: function() {
    return {
      timeslots:"slider closed",
      calendarButton: 'buttonShown',
      slotsSelected: []
    };
  },
  /**
   * Show/Hide the timeslot selector
   */
  changeView:function(){
    if (this.state.timeslots === 'slider'){
        this.setState({
                        timeslots: 'slider closed',
                        calendarButton: 'buttonShown',
                        slotsSelected: this.state.slotsSelected
                      });
    } else {
        this.setState({
                        timeslots: 'slider',
                        calendarButton: 'buttonHidden',
                        slotsSelected: this.state.slotsSelected
                      });
    }
  },
  /**
   * Show the timeslot and hide the button
   */
  handleClick: function() {
    console.log('Request a viewing is shown at the bottom of the screen');
    this.changeView();
  },
  /**
   * Write the result in console, hide the timeslot selector and show the button
   */
  handleSubmit: function(values) {
    console.log('Slots selected:');
    console.log(JSON.stringify(values));
    this.changeView();
  },
  render: function() {
    return (
      <div>
        <div className={this.state.calendarButton}>
          <h1>MoveBubble Test</h1>
          <h2>Based on ReactJS Tutorial</h2>

            <input
              className="initButton"
              type="button"
              value="SCHEDULE A VIEWING"
              onClick={this.handleClick}
            />
        </div>

        <div className={this.state.timeslots}>
          <TimeSlotList submitData={this.handleSubmit} cancelData={this.handleClick}/>
        </div>
      </div>
    );
  }
});
/**
 * Shows the component at the 'content' div in the web page
 */
ReactDOM.render(
  <Calendar/>,
  document.getElementById('content')
);
