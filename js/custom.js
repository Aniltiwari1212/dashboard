// Market Research Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initMarketTrendsChart();
    initDemographicsChart();
    initCompetitorChart();

    // Set up event listeners
    setupTimeFilterEvents();
    setupNavEvents();
    setupSearchFunctionality();
});

// Time filter functionality
function setupTimeFilterEvents() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update charts based on selected time period
            const timePeriod = this.getAttribute('data-time');
            updateChartsForTimePeriod(timePeriod);
        });
    });
}

// Navigation functionality
function setupNavEvents() {
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Searching for:', query);
        // Implement actual search functionality here
        
        // Example: Show alert for demo purposes
        alert(`Searching for: ${query}`);
    }
}

// Update all charts based on time period
function updateChartsForTimePeriod(timePeriod) {
    console.log('Updating charts for time period:', timePeriod);
    
    // Get data for the selected time period
    const marketTrendsData = getMarketTrendsData(timePeriod);
    const demographicsData = getDemographicsData(timePeriod);
    const competitorData = getCompetitorData(timePeriod);
    
    // Update each chart
    updateMarketTrendsChart(marketTrendsData);
    updateDemographicsChart(demographicsData);
    updateCompetitorChart(competitorData);
    
    // Update metrics
    updateMetricsForTimePeriod(timePeriod);
}

// Market Trends Chart
function initMarketTrendsChart() {
    const ctx = document.getElementById('marketTrendsChart').getContext('2d');
    
    // Sample data for market trends
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [18.2, 19.6, 20.8, 22.1, 23.0, 23.5],
                borderColor: '#4a6cf7',
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Industry Growth (%)',
                data: [5.2, 5.8, 6.4, 7.0, 7.6, 8.2],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    // Chart configuration
    window.marketTrendsChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateMarketTrendsChart(data) {
    if (window.marketTrendsChart && data) {
        window.marketTrendsChart.data.labels = data.labels;
        window.marketTrendsChart.data.datasets[0].data = data.marketShare;
        window.marketTrendsChart.data.datasets[1].data = data.industryGrowth;
        window.marketTrendsChart.update();
    }
}

// Demographics Chart
function initDemographicsChart() {
    const ctx = document.getElementById('demographicsChart').getContext('2d');
    
    // Sample data for demographics
    const data = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
            data: [15, 30, 25, 18, 12],
            backgroundColor: [
                'rgba(74, 108, 247, 0.8)',
                'rgba(40, 167, 69, 0.8)', 
                'rgba(252, 196, 25, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(108, 117, 125, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };
    
    // Chart configuration
    window.demographicsChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

function updateDemographicsChart(data) {
    if (window.demographicsChart && data) {
        window.demographicsChart.data.labels = data.labels;
        window.demographicsChart.data.datasets[0].data = data.values;
        window.demographicsChart.update();
    }
}

// Competitor Chart
function initCompetitorChart() {
    const ctx = document.getElementById('competitorChart').getContext('2d');
    
    // Sample data for competitor analysis
    const data = {
        labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
        datasets: [{
            label: 'Market Share (%)',
            data: [23.5, 19.2, 16.8, 14.3, 26.2],
            backgroundColor: [
                'rgba(74, 108, 247, 0.8)',
                'rgba(40, 167, 69, 0.8)',
                'rgba(252, 196, 25, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(108, 117, 125, 0.8)'
            ],
            borderWidth: 0
        }]
    };
    
    // Chart configuration
    window.competitorChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateCompetitorChart(data) {
    if (window.competitorChart && data) {
        window.competitorChart.data.labels = data.labels;
        window.competitorChart.data.datasets[0].data = data.values;
        window.competitorChart.update();
    }
}

// Update metrics
function updateMetricsForTimePeriod(timePeriod) {
    // Get metric data for selected time period
    const metricData = getMetricData(timePeriod);
    
    // Update market share metric
    document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = metricData.marketShare + '%';
    updateMetricChange('.metric-card:nth-child(1) .metric-change', metricData.marketShareChange);
    
    // Update customer satisfaction metric
    document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = metricData.customerSatisfaction + '/5';
    updateMetricChange('.metric-card:nth-child(2) .metric-change', metricData.customerSatisfactionChange);
    
    // Update growth rate metric
    document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = metricData.growthRate + '%';
    updateMetricChange('.metric-card:nth-child(3) .metric-change', metricData.growthRateChange);
    
    // Update ROI metric
    document.querySelector('.metric-card:nth-child(4) .metric-value').textContent = metricData.roi + '%';
    updateMetricChange('.metric-card:nth-child(4) .metric-change', metricData.roiChange);
}

function updateMetricChange(selector, change) {
    const element = document.querySelector(selector);
    
    // Update text
    element.textContent = (change >= 0 ? '+' : '') + change + (selector.includes('nth-child(2)') ? '' : '%');
    
    // Update class
    if (change >= 0) {
        element.classList.remove('negative');
        element.classList.add('positive');
    } else {
        element.classList.remove('positive');
        element.classList.add('negative');
    }
}

// Sample data for different time periods
function getMarketTrendsData(timePeriod) {
    const data = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            marketShare: [22.8, 23.0, 23.1, 23.3, 23.4, 23.5, 23.5],
            industryGrowth: [7.8, 7.9, 8.0, 8.0, 8.1, 8.2, 8.2]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            marketShare: [22.0, 22.5, 23.0, 23.5],
            industryGrowth: [7.5, 7.7, 8.0, 8.2]
        },
        quarter: {
            labels: ['Jan', 'Feb', 'Mar'],
            marketShare: [21.2, 22.3, 23.5],
            industryGrowth: [7.0, 7.6, 8.2]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            marketShare: [19.5, 21.0, 22.5, 23.5],
            industryGrowth: [6.0, 6.8, 7.5, 8.2]
        }
    };
    
    return data[timePeriod];
}

function getDemographicsData(timePeriod) {
    const data = {
        week: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [15, 30, 25, 18, 12]
        },
        month: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [16, 29, 24, 19, 12]
        },
        quarter: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [17, 28, 25, 18, 12]
        },
        year: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [18, 27, 24, 19, 12]
        }
    };
    
    return data[timePeriod];
}

function getCompetitorData(timePeriod) {
    const data = {
        week: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [23.5, 19.2, 16.8, 14.3, 26.2]
        },
        month: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [23.0, 19.5, 17.0, 14.5, 26.0]
        },
        quarter: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [22.0, 20.0, 17.5, 15.0, 25.5]
        },
        year: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [21.0, 20.5, 18.0, 15.5, 25.0]
        }
    };
    
    return data[timePeriod];
}

function getMetricData(timePeriod) {
    const data = {
        week: {
            marketShare: 23.5,
            marketShareChange: 0.3,
            customerSatisfaction: 4.7,
            customerSatisfactionChange: 0.1,
            growthRate: 8.2,
            growthRateChange: -0.1,
            roi: 142,
            roiChange: 5
        },
        month: {
            marketShare: 23.0,
            marketShareChange: 1.5,
            customerSatisfaction: 4.6,
            customerSatisfactionChange: 0.2,
            growthRate: 8.0,
            growthRateChange: -0.3,
            roi: 138,
            roiChange: 8
        },
        quarter: {
            marketShare: 21.5,
            marketShareChange: 2.0,
            customerSatisfaction: 4.5,
            customerSatisfactionChange: 0.3,
            growthRate: 7.8,
            growthRateChange: -0.4,
            roi: 130,
            roiChange: 10
        },
        year: {
            marketShare: 19.5,
            marketShareChange: 4.0,
            customerSatisfaction: 4.4,
            customerSatisfactionChange: 0.3,
            growthRate: 7.5,
            growthRateChange: -0.5,
            roi: 120,
            roiChange: 22
        }
    };
    
    return data[timePeriod];
}

// Add animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        }, 100);
    });
    
    // Add hover effects to chart cards
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 12px 24px';
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'rgba(149, 157, 165, 0.1) 0px 8px 24px';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

// Note: This JavaScript assumes the inclusion of Chart.js library in the project
// Add this line to your HTML before closing body tag:
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>






const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.innerHTML =
    "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}


function myFunction(x) {
  x.classList.toggle("change");
}


function myFunction() {
  var element = document.getElementById("myDIV");
  element.classList.toggle("mystyle");
}