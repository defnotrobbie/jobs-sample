# ITA Application Specification

## Overview

### Executive Summary
The ITA Application is set of forms and editorial functions related to those forms. This application will serve as the job application portal for all student positions in CHC. ITSS will be able to control all aspects of the forms, including creating new ones, revising questions, setting open and close dates, etc. The completed submissions will be available for viewing in Candidate Selection.

### Milestones

### Stack
 * Front End
   * React + redux
   * Served by web app
 * Back End
   * Controller/Logic
     * is a web app titled ITA Application
     * Node.js + Express.js web app
     * MongoDB or Redis session store
     * Secured by Passport.js + Shibboleth authentication
   * Model/Data
     * is a series of databases
     * CF-based microservice
     * Secured by firewall and whitelisting
   * Identity and Access Management
     * CF-based mircroservice
     * is a a database
     * responds with organizational roles, not necessarily application specific data
     * Secured by firewall and whitelisting
          
## Components

### Home
  * Weblogin Protected
  * Documents CHC positions and responsibilities
  * Links to application
  OR
  * Displays application status
  
### Job Application
  * Saves progress automatically
    * Save button to commit progress?
  * Mobile friendly
  * Accessibility concerns
    
### Application Status
  * Displays information regarding status of application(s)
    * Can multiple positions be applied for simultaneously?
    * Display rejected or re-opened applications (if in error or ITSS suggest applying for different position)?

### Administrative Dashboard
  * List of positions
    * Links to Edit, Deactivate, History
  * Add Position
    * Link to add a position component
    
### Add A Position
  External service
### Form Builder
  External service
  
## Users
  * Potential Applicants
    * New/no application
    * Application in progress
    * Application completed
      * Accepted or rejected
    * Application returned (not accepted or rejected)
