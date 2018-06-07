export const apps = [
  {
    DISPLAY_OPEN: "April, 10 2018 12:47:00",
    ACTIVE: 1,
    APPLICATION_CLOSE: "May, 31 2018 09:41:00",
    TITLE: "Manager",
    ID: 16,
    DISPLAY_CLOSE: "May, 31 2018 09:41:00",
    MODIFIED: "May, 01 2018 11:53:29",
    FORMID: "0b558d56-e3c2-4114-8592-55090a369f60",
    FORMVERSION: 11
  },
  {
    DISPLAY_OPEN: "April, 23 2018 13:30:00",
    ACTIVE: 0,
    APPLICATION_CLOSE: "June, 23 2018 13:30:00",
    TITLE: "Manager2",
    ID: 17,
    DISPLAY_CLOSE: "June, 23 2018 13:30:00",
    MODIFIED: "May, 01 2018 09:57:35",
    FORMID: "a315da8c-2aa1-4802-ac59-bdc42fbc5870",
    FORMVERSION: 12.001
  }
];
export const userApps = [
  {
    DISPLAY_OPEN: "April, 10 2018 12:47:00",
    CREATED: "April, 17 2018 01:28:03",
    APPLICATION_CLOSE: "June, 02 2018 00:00:00",
    APP_COMPLETED: 1,
    TITLE: "Manager",
    ID: 16,
    MODIFIED: "April, 18 2018 12:03:36",
    DISPLAY_CLOSE: "May, 31 2018 09:41:00",
    APP_ACTIVE: 1
  }
];
export const appform16 = {
  APPLICATIONNAME: "Manager",
  QUESTIONS: [
    { required: true, label: "First Name", id: "Firstname_field", type: "TEXTAREA" },
    { required: true, label: "Last Name", id: "Last_Name", type: "TEXTAREA" },
    { required: 0, label: "Optional Resume Upload (Max 2MB)", id: "Resume", type: "DOC_UPLOAD" },
    { required: true, label: "Email", id: "email_field", type: "TEXTAREA" },
    { required: true, label: "Phone Number", id: "PhoneNum_Field", type: "TEXT" },

    {
      required: true,
      label: "How much do you like free form questions? Why?",
      id: "freeform",
      type: "TEXT"
    },
    {
      required: true,
      label: "Will check this box?",
      id: "box1 ",
      options: [{ label: "Yes " }, { label: "No " }],
      type: "SELECT"
    },
    {
      required: true,
      label: "Will you check this other box?",
      id: "box2",
      options: [{ label: "Yes ", value: "yes" }, { label: "No ", value: "no" }],
      type: "RADIO"
    },
    {
      required: true,
      label:
        "Please select the location you'd like to manage next year.  Please understand not all locations will have availability so you may be asked to interview for a different location that you currently work for.",

      id: "location",
      options: [
        { label: "Location 1" },
        { label: "Location 2" },
        { label: "Location 3" },
        { label: "Location 4" },
        { label: "Location 5" },
        { label: "Location 6" },
        { label: "Location 7" },
        { label: "Location 8" },
        { label: "Location 9" },
        { label: "Location 10" },
        { label: "Location 11" },
        { label: "Location 12" },
        { label: "Location 13" }
      ],
      type: "SELECT"
    },
    {
      required: 0,
      label: "T Shirt Size",
      id: "t_shirt_size",
      options: [
        { label: "XS" },
        { label: "S" },
        { label: "M" },
        { label: "L" },
        { label: "XL" },
        { label: "XXL" },
        { label: "XXXL" },
        { label: "XXXXL" }
      ],
      type: "SELECT"
    },
    { required: 0, label: "", id: "PageBreak2", type: "PAGEBREAK" },
    {
      required: true,
      label: "Why would you like to have this job?",
      id: "Mgr_why",
      type: "TEXTAREA"
    },
    {
      required: true,
      label:
        "What do you think is the most important attribute to have as manager supervising in customer service roles?",
      id: "mgr_attributes ",
      type: "TEXTAREA"
    },
    {
      required: true,
      label: "Tell me about the time you led an important meeting. How did you prepare for it?",
      id: "Mgr_meeting",
      type: "TEXTAREA"
    },
    {
      required: true,
      label:
        "As a manager one of your jobs is to provide direction and leadership for a work unit or team. Describe a time accomplished this in the past.",
      id: "Mgr_Direction",
      type: "TEXTAREA"
    },
    {
      required: true,
      label: "How do you see a manager’s role on a team?",
      id: "Mgr_role",
      type: "TEXTAREA"
    },
    {
      required: true,
      label: "Share an example of how you were able to motivate employees or co-workers.",
      id: "Mgr_motivate",
      type: "TEXTAREA"
    }
  ],
  APPID: 16,
  DESCRIPTION:
    "Managers are responsible for supervising employees at the location they manage. Responsibilities include but are not limited to, scheduling, payroll, project management, write and deliver staff evaluations, perform interviews, develop staff, and all of the responsibilities of the staff. \r\n\r\nThe Manager will frequently collaborate with full time staff and other managers, and their staff to ensure the best experiences for the customers and clients and their location. \r\n\r\nManagers will get advanced training opportunities and learn to develop skills they will continue to build on long throughout their careers. \r\n\r\nManagers MUST be available for summer manager training starting XXXX.  This is non-negotiable.",
  VERSION: 9,
  ID: "8628d66f-8bab-43b7-9930-a466cfc2d5df"
};

export const appform17 = {
  APPLICATIONNAME: "Manager2",
  QUESTIONS: [
    { required: true, label: "First Name", id: "Firstname_field", type: "TEXTAREA" },
    { required: true, label: "Last Name", id: "Last_Name", type: "TEXTAREA" },
    { required: 0, label: "Optional Resume Upload (Max 2MB)", id: "Resume", type: "DOC_UPLOAD" },
    { required: true, label: "Email", id: "email_field", type: "TEXTAREA" },
    { required: true, label: "Phone Number", id: "PhoneNum_Field", type: "TEXT" },

    {
      required: true,
      label: "How much do you like free form questions? Why?",
      id: "freeform",
      type: "TEXT"
    },
    {
      required: true,
      label: "Will check this box?",
      id: "box1 ",
      options: [{ label: "Yes " }, { label: "No " }],
      type: "SELECT"
    },
    {
      required: true,
      label: "Will you check this other box?",
      id: "box2",
      options: [{ label: "Yes ", value: "yes" }, { label: "No ", value: "no" }],
      type: "RADIO"
    }
  ],
  APPID: 17,
  DESCRIPTION:
    "Managers are responsible for supervising employees at the location they manage. Responsibilities include but are not limited to, scheduling, payroll, project management, write and deliver staff evaluations, perform interviews, develop staff, and all of the responsibilities of the staff. \r\n\r\nThe Manager will frequently collaborate with full time staff and other managers, and their staff to ensure the best experiences for the customers and clients and their location. \r\n\r\nManagers will get advanced training opportunities and learn to develop skills they will continue to build on long throughout their careers. \r\n\r\nManagers MUST be available for summer manager training starting XXXX.  This is non-negotiable.",
  VERSION: 9,
  ID: "8628d66f-8bab-43b7-9930-a466cfc2d5df"
};

export const userapp16 = {
  CREATED: "April, 17 2018 01:28:03",
  COMPLETED: 1,
  ID: 12345678,
  ACTIVE: 1,
  APPID: 16,
  MODIFIED: "April, 18 2018 12:03:36",
  RESPONSE: {
    // "TrainingAvailability ": "Yes",
    // AcademicYear: "Sophomore",
    // Mgr_meeting: 123,
    // Major: "test",
    // fall_2018_housing: "New College House",
    // "mgr_attributes ": 321,
    // work_study_grant_2018: "Yes",
    // Mgr_motivate: 123,
    // Last_Name: "Nichols",
    // Firstname_field: "Robbie",
    // Resume: { originalName: "test.txt", name: "32574410-16.txt" },
    // Mgr_Direction: 321,
    // t_shirt_size: "XS",
    // managing_house_fall2018: "New College House",
    // Mgr_why: 123,
    // PhoneNum_Field: "111-111-1111",
    // "penn email_field": "nichr@upenn.edu",
    // Mgr_role: 123
  },
  FORMVERSION: 9,
  FORMID: "8628d66f-8bab-43b7-9930-a466cfc2d5df"
};
