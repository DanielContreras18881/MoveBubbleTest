var Day = React.createClass({
  getInitialState: function() {
    return {
      selected: this.props.selected,
      classDate: this.props.selected ? "dateElementSelected" : "dateElement",
      classDayNumber: this.props.selected ? "dayNumberSelected" : "dayNumber",
      classDayMonth: this.props.selected ? "dayMonthSelected" : "dayMonth",
      classDayName: this.props.selected ? "dayNameSelected" : "dayName"
    };
  },
  selectDay: function(){
    this.props.updateSelectedDate(this.key);
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
          selected:true
        },
        {
          id: 2,
          dayName: moment().add(1, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(1, 'days').date(),
          dayMonth: moment().add(1, 'days').format('MMM').toUpperCase(),
          selected:false
        },
        {
          id: 3,
          dayName: moment().add(2, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(2, 'days').date(),
          dayMonth: moment().add(2, 'days').format('MMM').toUpperCase(),
          selected:false
        },
        {
          id: 4,
          dayName: moment().add(3, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(3, 'days').date(),
          dayMonth: moment().add(3, 'days').format('MMM').toUpperCase(),
          selected:false
        },
        {
          id: 5,
          dayName: moment().add(4, 'days').format('ddd').toUpperCase(),
          dayNumber: moment().add(4, 'days').date(),
          dayMonth: moment().add(4, 'days').format('MMM').toUpperCase(),
          selected:false
        }
      ]
    };
  },
  handleDayChange: function(value) {
    var dates = this.state.data.filter(function(item) {
        if(item.id === value){
          item.selected = true;
        }else{
          item.selected = false;
        }
        return item;
      });
    this.setState({data:dates});
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
              var boundClick = this.handleDayChange.bind(this, day.id);
              return (
                <Day
                    selected={day.selected}
                    dayMonth={day.dayMonth}
                    dayNumber={day.dayNumber}
                    dayName={day.dayName}
                    key={day.id}
                    updateSelectedDate={boundClick}/>
              );
            },this)}
          </div>
        </div>
      </div>
    );
  }
});

var Slot = React.createClass({
  selectedSlot: function() {
    console.log('props:'+JSON.stringify(this.props));
    console.log('state:'+JSON.stringify(this.state));
  },

  render: function() {
    return (
      <div className="slot" onClick={this.selectedSlot}>
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
      calendarButton: 'buttonShown'
    };
  },
  handleClick: function() {
    console.log('Request a viewing is shown at the bottom of the screen');
    if (this.state.timeslots === 'slider'){
        this.setState({
                        timeslots: 'slider closed',
                        calendarButton: 'buttonShown'
                      });
    } else {
        this.setState({
                        timeslots: 'slider',
                        calendarButton: 'buttonHidden'
                      });
    }
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
          <TimeSlotList submitData={this.handleClick} cancelData={this.handleClick}/>
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
  render: function() {
    var timeSlotNodes = timeslots.map(function(slot) {
      return (
        <Slot name={slot.slot} desc={slot.hours} key={slot.id}/>
      );
    });

    return (
      <div className="timeSlotList">
        <input
          className="cancelButton"
          type="button"
          value="V"
          onClick={this.props.cancelData}
        />
        <Dates/>
        {timeSlotNodes}
        <input
          className="submitButton"
          type="button"
          value="SELECT MULTIPLE TIMESLOTS"
          onClick={this.props.submitData}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <Calendar/>,
  document.getElementById('content')
);
