var Day = React.createClass({
  getInitialState: function() {
    return {
      selected: this.props.selected,
      classDate: this.props.selected ? "dateElementSelected" : "dateElement",
      classDayNumber: this.props.selected ? "dayNumberSelected" : "dayNumber",
      classDayMonth: this.props.selected ? "dayMonthSelected" : "dayMonth",
      classDayName: this.props.selected ? "dayNameSelected" : "dayName"
    };
    this.props.updateSelectedDateElement(1);
  },
  selectDay: function(){
    this.props.updateSelectedDateElement(this.key);
  },
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

var Dates = React.createClass({
  getInitialState: function() {
    return{
      data: [
        {
          id: 1,
          dayName: moment().format('ddd').toUpperCase(),
          dayNumber: moment().date(),
          dayMonth: moment().format('MMM').toUpperCase(),
          dayYear: moment().format('YYYY'),
          selected:true
        },
        {
          id: 2,
          dayName: moment().add(1, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(1, 'days').date(),
          dayMonth: moment().add(1, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(1, 'days').format('YYYY'),
          selected:false
        },
        {
          id: 3,
          dayName: moment().add(2, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(2, 'days').date(),
          dayMonth: moment().add(2, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(2, 'days').format('YYYY'),
          selected:false
        },
        {
          id: 4,
          dayName: moment().add(3, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(3, 'days').date(),
          dayMonth: moment().add(3, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(3, 'days').format('YYYY'),
          selected:false
        },
        {
          id: 5,
          dayName: moment().add(4, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(4, 'days').date(),
          dayMonth: moment().add(4, 'days').format('MMM').toUpperCase(),
          dayYear: moment().add(4, 'days').format('YYYY'),
          selected:false
        }
      ]
    };
  },
  handleDayChange: function(value) {
    var dateSelected = null;
    var dates = this.state.data.filter(function(item) {
        if(item.id === value){
          item.selected = true;
          dateSelected = item;
        }else{
          item.selected = false;
        }
        return item;
      });
    this.setState({data:dates});
    this.props.updateSelectedDate(dateSelected);
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
              var dateSelected = this.handleDayChange.bind(this, day.id);
              return (
                <Day
                    selected={day.selected}
                    dayMonth={day.dayMonth}
                    dayNumber={day.dayNumber}
                    dayName={day.dayName}
                    key={day.id}
                    updateSelectedDateElement={dateSelected}/>
              );
            },this)}
          </div>
        </div>
      </div>
    );
  }
});

var Slot = React.createClass({
  getInitialState: function() {
    return {
      classSlot:"slot",
      slotsSelected:0
    };
  },
  selectedSlot: function() {
    this.setState({classSlot:this.state.classSlot==='slot'?'slotSelected':'slot'});
    this.props.updateSlotsSelected(this.props);
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

var Calendar = React.createClass({
  getInitialState: function() {
    return {
      timeslots:"slider closed",
      calendarButton: 'buttonShown',
      slotsSelected: []
    };
  },
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
  handleClick: function() {
    console.log('Request a viewing is shown at the bottom of the screen');
    this.changeView();
  },
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

const timeslots = [ {
                    "id": 1,
                    "slot": "Morning",
                    "hours": "08:00 - 12:00"
                  }, {
                    "id": 2,
                    "slot": "Afertnoon",
                    "hours": "12:00 - 18:00"
                  }, {
                    "id": 3,
                    "slot": "Evening",
                    "hours": "18:00 - 22:00"
                  } ];

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
        selected:true
      },
      classSubmitbutton:'submitButton',
      textSubmitbutton:'SELECT MULTIPLE TIMESLOTS'
    };
  },
  handleSlotChange: function(value){
    var slot = timeslots.filter(function(item) {
        if(item.id === value){
          return item
        }
      })[0];
    slot.slotDate=this.state.dateSelected.dayNumber;
    slot.slotMonth=this.state.dateSelected.dayMonth;
    slot.slotYear=this.state.dateSelected.dayYear;
    var slots = this.state.slotsData;
    var addSlot = true;
    this.state.slotsData.filter(function(item) {
      [{"id":1,"slot":"Morning","hours":"08:00 - 12:00","slotDate":17,"slotMonth":"JUL","slotYear":"2016"}]
        if(
          item.slot === slot.slot &&
          item.hours === slot.hours &&
          item.slotDate === slot.slotDate &&
          item.slotMonth === slot.slotMonth &&
          item.slotYear === slot.slotYear){
            addSlot = false;
        }
    });
    if(addSlot) {
      slots.push(slot);
    }else{
      slots.pop(slot);
    }
    this.setState({
      data:slots,
      dateSelected:this.state.dateSelected,
      classSubmitbutton:slots.length>0?'submitButtonSelected':'submitButton',
      textSubmitbutton:slots.length>0?'SEND '+slots.length+' TIMESLOTS':'SELECT MULTIPLE TIMESLOTS',
    });
  },
  handleDaySelected:function (value){
    this.setState({
      slotsData:this.state.slotsData,
      dateSelected:value
    });
  },
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
        <Dates updateSelectedDate={this.handleDaySelected}/>
        {timeslots.map(function(slot) {
          var slotSelected = this.handleSlotChange.bind(this, slot.id);
          return (
            <Slot name={slot.slot} desc={slot.hours} key={slot.id} updateSlotsSelected={slotSelected}/>
          );
        },this)}
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

ReactDOM.render(
  <Calendar/>,
  document.getElementById('content')
);
