import react, { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Pageview';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/EditLocation'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import currentUserContext from '../context/userContext.js';

import AddNewMeeting from './NewBooking.js'
import MyMeetings from './MyClasses.js'
import EditProfile from './EditProfile.js'
import Dashboard from './Dashboard.js'
import AllMeetings from './DisplayAllClasses.js'

import { useHistory } from 'react-router';

const studentModes = ["Dashboard", "Edit Profile", "View My Meetings"]
const teacherModes = ["Dashboard", "Edit Profile", "View My Meetings", "Add New Meeting"]
const adminModes = ["Dashboard", "Edit Profile", "View My Meetings", "Add New Meeting", "View All Meetings"]

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  root: {


    flexGrow: 1,
    minWidth: "100%",
    margin: "auto",
    //justifyContent: "center",
    //alignItems: "center",
    // "&>header": {
    //   minWidth: "100%",
    //   alignItems: "center",
    //   "&>div": {
    //     display: "flex", justifyContent: "center",
    //     minWidth: "100%"
    //   }
  },
  Scroller: {
    display: "flex",
    justifyContent: "center"
  },
  Tabs: {
    display: "flex",
    minwidth: "100%",
    justifyContent: "center"
  },
  Indicator: {
    height: 3,
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0)',
    transform: "scale(.8)",


  },
  Tab: {
    marginRight: "20px",
    minWidth: "20%",
    fontWeight: "400",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      fontSize: 14
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      fontSize: 12
    }
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  }
}));

const ProfilePage = () => {

  const [selectedMode, setSelectedMode] = useState("Dashboard");

  const { user, setUser } = useContext(currentUserContext)
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = useState(0)
  // console.log(user);
  const Logout = () => {
    console.log("Logged out!!")
    setUser(null)
    localStorage.setItem('user', JSON.stringify(null));
    history.push('/')
  }

  const handleChange = (event, newValue) => {
    const modes = user.Type === "Student" ? studentModes : user.Type === "Teacher" ? teacherModes : adminModes
    console.log(modes)
    console.log(newValue)
    if (modes[newValue] === "Logout") {
      Logout();
      return;
    }

    setSelectedMode(modes[newValue]);
    setValue(newValue)
  }


  return (
    <div className={classes.body}>
      { user ?
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              className={classes.Tabs}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="none"
              textColor="secondary"
              classes={{ indicator: classes.Indicator, scroller: classes.Scroller }}
              aria-label="scrollable article navigation bar"
            >
              <Tab
                className={classes.Tab}
                label={<span>Dashboard</span>}
                icon={<DashboardIcon />}
                key={"Dashboard"}
              />
              <Tab
                className={classes.Tab}
                label={<span>Edit Profile</span>}
                icon={<EditIcon />}
                key={"Edit Profile"}
              />
              {user.Type === "Teacher" || user.Type === "Student" ?
                <Tab
                  className={classes.Tab}
                  label={<span>View My Classes</span>}
                  icon={<ViewIcon />}
                  key={"View My Meetings"}
                />
                :
                <></>
              }
              {user.Type === "Teacher" ?
                <Tab
                  className={classes.Tab}
                  label={<span>Book A Class</span>}
                  icon={<BookIcon />}
                  key={"Add New Meeting"}
                /> : <></>
              }
              {user.Type === "Admin" ?
                <Tab
                  className={classes.Tab}
                  label={<span>View All Classes</span>}
                  icon={<ViewIcon />}
                  key={"View All Meetings"}
                /> :
                <></>
              }
            </Tabs>
          </AppBar>
        </div>
        :
        <></>
      }
      <main className={classes.content}>
        {
          selectedMode === "Dashboard" ? <Dashboard changeSelectedMode={setSelectedMode} changeIndicatortab={setValue} /> : <></>
        }
        {
          selectedMode === "Add New Meeting" ? <AddNewMeeting changeSelectedMode={setSelectedMode} changeIndicatortab={setValue} /> : <></>
        }
        {
          selectedMode === "View My Meetings" ? <MyMeetings changeSelectedMode={setSelectedMode} changeIndicatortab={setValue} /> : <></>
        }
        {
          selectedMode === "Edit Profile" ? <EditProfile changeSelectedMode={setSelectedMode} changeIndicatortab={setValue} /> : <></>
        }
        {
          selectedMode === "View All Meetings" ? <AllMeetings changeSelectedMode={setSelectedMode} changeIndicatortab={setValue} /> : <></>
        }
      </main>
    </div>
  )
}

export default ProfilePage