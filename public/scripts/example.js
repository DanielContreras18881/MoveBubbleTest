var Dates = React.createClass({
  render: function() {
        var textExplain = "We'll walk to the agent and book it in.";
        var dates = [
          {
            id: 1,
            dayName: moment().format('ddd').toUpperCase(),
            dayNumber: moment().date(),
            dayMonth: moment().format('MMM').toUpperCase()
          },
          {
            id: 2,
            dayName: moment().add(1, 'days').format('ddd').toUpperCase(),
            dayNumber: moment().add(1, 'days').date(),
            dayMonth: moment().add(1, 'days').format('MMM').toUpperCase()
          },
          {
            id: 3,
            dayName: moment().add(2, 'days').format('ddd').toUpperCase(),
            dayNumber: moment().add(2, 'days').date(),
            dayMonth: moment().add(2, 'days').format('MMM').toUpperCase()
          },
          {
            id: 4,
            dayName: moment().add(3, 'days').format('ddd'),
            dayNumber: moment().add(3, 'days').date(),
            dayMonth: moment().add(3, 'days').format('MMM')
          },
          {
            id: 5,
            dayName: moment().add(4, 'days').format('ddd'),
            dayNumber: moment().add(4, 'days').date(),
            dayMonth: moment().add(4, 'days').format('MMM')
          }
        ];
        var datesNodes = dates.map(function(day) {
          return (
            <div key={day.id}  className="dateElement">
              <p className="dayName">{day.dayName}</p>
              <p className="dayNumber">{day.dayNumber}</p>
              <p className="dayMonth">{day.dayMonth}</p>
            </div>
          );
        });

    return (
      <div>
        <h3 className="adviceText">
          Pick times that suit you.
        </h3>
        <p className="adviceExplain">{textExplain}</p>
        <div id="container" className="containerDatesList">
          <div id="inner"  className="innerDatesList">
            {datesNodes}
          </div>
        </div>
      </div>
    );
  }
});

var Slot = React.createClass({
  rawMarkup: function() {
    /*
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
    */
           //<span dangerouslySetInnerHTML={this.rawMarkup()} />
  },

  render: function() {
    return (
      <div className="slot">
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

        <div className={this.state.timeslots} onClick={this.handleClick}>
          <TimeSlotList />
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
        <Slot name={slot.slot} desc={slot.hours} key={slot.id} />
      );
    });

    return (
      <div className="timeSlotList">
        <input
          className="cancelButton"
          type="button"
          value="V"
          onClick={this.handleClick}
        />
        <Dates/>
        {timeSlotNodes}
        <input
          className="submitButton"
          type="button"
          value="SELECT MULTIPLE TIMESLOTS"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <Calendar/>,
  document.getElementById('content')
);
