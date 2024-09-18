//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

/* utlity route for redirects */
router.use((req, res, next) => {
  if (req.session.data?.redirect) {
    const serviceRedirect = req.session.data.redirect;
    delete req.session.data.redirect;
    res.redirect(serviceRedirect)
  } else {
    next();
  }
})

// TA V1 routes //

router.get(/claimantAvailable/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('verify-id') // in input value is "yes" = redirect to 'page-name' //
    }
    else if (req.query.radioGroup === "answerNo") {
        res.redirect('unavailable-why')
    }
    else {
        res.redirect('fta')
    }
})

router.get(/unavailableWhy/ , function (req, res) {
    if (req.query.radioGroup === "unwell") {
        res.redirect('abandon') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('fta')
    }
})

router.get(/idVerify/ , function (req, res) {
    if (req.query.radioGroupId === "pass") {
        res.redirect('consent') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('id-fail')
    }
})

router.get(/getConsent/ , function (req, res) {
    if (req.query.radioGroupConsent === "yes") {
        res.redirect('attendees') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('fta')
    }
})

router.get(/attendeeInfo/ , function (req, res) {
    if (req.query.radioGroupAttendees === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('hoc-additional')
    }
})

router.get(/attendeeInfoTwo/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('hoc-additional')
    }
})

router.get(/callAttendees/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-treatment-additional')
    }
})

router.get(/fourAttendeeInfo/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-treatment-additional')
    }
})

router.get(/medsTreatment/ , function (req, res) {
    if (req.query.radioGroup === "meds") {
        res.redirect('meds') // in input value is "yes" = redirect to 'page-name' //
    }
    else if (req.query.radioGroup === "treatment") {
        res.redirect('treatment')
    }
    else {
        res.redirect('histories')
    }
})

// IT 2 ROUTES //

router.get(/conditionAddAnother/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('ta-task-list3')
    }
})

router.get(/medsAddAnother/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('meds') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('treatment')
    }
})

router.get(/treatmentAddAnother/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('treatment') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('ta-task-list3-5')
    }
})

router.get(/twoCallAttendees/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('conditions-additional')
    }
})

router.get(/fiveAttendeeInfo/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-additional')
    }
})

router.get(/callConditions/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-additional')
    }
})
router.get(/callMeds/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('meds') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('treatment-additional')
    }
})

router.get(/callTreatment/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('soch1-additional')
    }
})




// IT 3 ROUTES //

router.get(/conditionAddAnother/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('ta-task-list3')
    }
})

router.post('/ta-3/conditions', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action
  
   res.redirect('/ta-3/add-condition')
  })


// router.get(/medsAddAnother/ , function (req, res) {
//     if (req.query.radioGroup === "Yes") {
//         res.redirect('meds') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('ta-tasklist3-5')
//     }
// })

router.post('/ta-3/meds-treatment2' , function (req, res) {
    if (req.session.data['another-med'] == "Yes") {
        res.redirect('/ta-3/meds')
      } else {
        res.redirect('/ta-3/ta-task-list3-5')
      }
})

router.post('/ta-3/meds', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['meds-side-effects']
    const additonalInfo = req.session.data['addInfo']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-3/meds-treatment2')
  })

  router.post('/ta-3/meds2', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['side-effects']
    const medicationSideEffects = req.session.data['side-effects-detail']
    const additonalInfo = req.session.data['additional-info']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medicationSideEffects, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-3/meds-additional')
  })

  router.post('/ta-3/treatment22', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-3/treatment-additional')
  })

  router.post('/ta-3/treatment', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-3/treatment2')
  })

  router.post('/ta-3/daily-living', function(req, res) {
    
    res.redirect('/ta-3/ta-task-list6')
   })

   router.post('/ta-3/mobility', function(req, res) {
    
    res.redirect('/ta-3/ta-task-list7')
   })

  router.post('/ta-3/daily-living/preparingfood', function(req, res) {
    
   res.redirect('/ta-3/daily-living2')
  })
  
  router.post('/ta-3/daily-living/takingnutrition', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/managingtherapy', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/washingbathing', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/toiletneeds', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/dressing', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/communicatingverbally', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/readingunderstanding', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/facetoface', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/daily-living/budgeting', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/journeys', function(req, res) {
    
    res.redirect('/ta-3/mobility')
   })

   router.post('/ta-3/movingaround', function(req, res) {
    
    res.redirect('/ta-3/mobility')
   })
   
   router.post('/ta-3/daily-living-justification', function(req, res) {
    
    res.redirect('/ta-3/daily-living2')
   })

   router.post('/ta-3/dl-qual', function(req, res) {
    
    res.redirect('/ta-3/mobility-qual')
   })

   // mobility qualiffying period
   router.post('/ta-3/mobility-qual', function(req, res) {
    
    res.redirect('/ta-3/ta-task-list9')
   })

   // Review period route
   router.post('/ta-3/review', function(req, res) {
    
    res.redirect('/ta-3/ta-task-list10')
   })

    router.post('/ta-3/ta-task-list10', function(req, res) {
    
        res.redirect('/ta-3/report')
       })
// router.get(/treatmentAddAnother/ , function (req, res) {
//     if (req.query.radioGroup === "Yes") {
//         res.redirect('treatment') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('ta-task-list3-5')
//     }
// })

router.post('/ta-3/treatment2' , function (req, res) {
    if (req.session.data['another-treatment'] == "Yes") {
        res.redirect('/ta-3/treatment')
      } else {
        res.redirect('/ta-3/ta-task-list4')
      }
})

// router.get(/twoCallAttendees/ , function (req, res) {
//     if (req.query.radioGroup === "yes") {
//         res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('meds-addtional')
//     }
// })

router.post('/ta-3/attendees' , function (req, res) {
    if (req.session.data['appointee'] == "yes") {
        res.redirect('/ta-3/attendee-details')
      } else {
        res.redirect('/ta-3/conditions-additional')
      }
})

// router.get(/fiveAttendeeInfo/ , function (req, res) {
//     if (req.query.radioGroup === "yes") {
//         res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('meds-additional')
//     }
// })

router.post('/ta-3/another-attendee' , function (req, res) {
    if (req.session.data['another-attendee'] == "yes") {
        res.redirect('/ta-3/attendee-details')
      } else {
        res.redirect('/ta-3/conditions-additional')
      }
})

router.get(/callConditions/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-additional')
    }
})

router.post('/ta-3/conditions-additional' , function (req, res) {
    if (req.session.data['add-another-condition'] == "Yes") {
        res.redirect('/ta-3/conditions2')
      } else {
        res.redirect('/ta-3/meds-additional')
      }
})

router.post('/ta-3/appointee-answers' , function (req, res) {
    if (req.session.data['add-another-attendee'] == "Yes") {
        res.redirect('/ta-3/attendee-details')
      } else {
        res.redirect('/ta-3/conditions-additional')
      }
})

router.post('/ta-3/meds-additional' , function (req, res) {
    if (req.session.data['add-another-med'] == "Yes") {
        res.redirect('/ta-3/meds2')
      } else {
        res.redirect('/ta-3/treatment-additional')
      }
})

router.post('/ta-3/treatment-additional' , function (req, res) {
    if (req.session.data['add-treatment'] == "Yes") {
        res.redirect('/ta-3/treatment22')
      } else {
        res.redirect('/ta-3/soch1-additional')
      }
})

router.post('/ta-3/conditions2' , function (req, res) {
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

   res.redirect('/ta-3/conditions-additional')

})

router.post('/ta-3/evidence' , function (req, res) {
    const documentDate = req.session.data['document-date']
    const evidenceType = req.session.data['evidenceusedpip']

    const evidence = req.session.data.evidence || []
    evidence.push({ documentDate, evidenceType })
    req.session.data.evidence = evidence
  
    req.session.data.evidence[req.session.data.evidence.length - 1].action

   res.redirect('/ta-3/ta-task-list2')

})

router.post('/ta-3/attendee-details' , function (req, res) {
    const name = req.session.data['attendee-name']
    const relationshipToClaimant = req.session.data['attendee-relationship']

    const queriesAttendee = req.session.data.queriesAttendee || []
    queriesAttendee.push({ name, relationshipToClaimant })
    req.session.data.queriesAttendee = queriesAttendee
  
    req.session.data.queriesAttendee[req.session.data.queriesAttendee.length - 1].action

   res.redirect('/ta-3/appointee-answers')

})
router.get(/callMeds/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('meds-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('treatment-additional')
    }
})

router.get(/callTreatment/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('soch1-additional')
    }
})


// IT 4 ROUTES //

router.post('/ta-4/add-condition', function (req, res) {
    if (req.session.data['anotherCondition'] == "Yes") {
        res.redirect('/ta-4/conditions')
      } else {
        res.redirect('/ta-4/ta-task-list')
      }
})

router.post('/ta-4/conditions', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action
  
   res.redirect('/ta-4/add-condition')
  })


// router.get(/medsAddAnother/ , function (req, res) {
//     if (req.query.radioGroup === "Yes") {
//         res.redirect('meds') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('ta-tasklist3-5')
//     }
// })

router.post('/ta-4/meds-treatment2' , function (req, res) {
    if (req.session.data['another-med'] == "Yes") {
        res.redirect('/ta-4/meds')
      } else {
        res.redirect('/ta-4/ta-task-list')
      }
})

router.post('/ta-4/meds', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['meds-side-effects']
    const additonalInfo = req.session.data['addInfo']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-4/meds-treatment2')
  })

  router.post('/ta-4/meds2', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['side-effects']
    const medicationSideEffects = req.session.data['side-effects-detail']
    const additonalInfo = req.session.data['additional-info']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medicationSideEffects, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-4/meds-additional')
  })

  router.post('/ta-4/treatment22', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-4/treatment-additional')
  })

  router.post('/ta-4/treatment', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-4/treatment2')
  })

  router.post('/ta-4/daily-living', function(req, res) {
    
    res.redirect('/ta-4/ta-task-list6')
   })

   router.post('/ta-4/mobility', function(req, res) {
    
    res.redirect('/ta-4/ta-task-list7')
   })

  router.post('/ta-4/daily-living/preparingfood', function(req, res) {
    
   res.redirect('/ta-4/daily-living2')
  })
  
  router.post('/ta-4/daily-living/takingnutrition', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/managingtherapy', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/washingbathing', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/toiletneeds', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/dressing', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/communicatingverbally', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/readingunderstanding', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/facetoface', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/daily-living/budgeting', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/journeys', function(req, res) {
    
    res.redirect('/ta-4/mobility')
   })

   router.post('/ta-4/movingaround', function(req, res) {
    
    res.redirect('/ta-4/mobility')
   })
   
   router.post('/ta-4/daily-living-justification', function(req, res) {
    
    res.redirect('/ta-4/daily-living2')
   })

   router.post('/ta-4/dl-qual', function(req, res) {
    
    res.redirect('/ta-4/mobility-qual')
   })

   // mobility qualiffying period
   router.post('/ta-4/mobility-qual', function(req, res) {
    
    res.redirect('/ta-4/ta-task-list9')
   })

   // Review period route
   router.post('/ta-4/review', function(req, res) {
    
    res.redirect('/ta-4/ta-task-list10')
   })

    router.post('/ta-4/ta-task-list10', function(req, res) {
    
        res.redirect('/ta-4/report')
       })
// router.get(/treatmentAddAnother/ , function (req, res) {
//     if (req.query.radioGroup === "Yes") {
//         res.redirect('treatment') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('ta-task-list3-5')
//     }
// })

router.post('/ta-4/treatment2' , function (req, res) {
    if (req.session.data['another-treatment'] == "Yes") {
        res.redirect('/ta-4/treatment')
      } else {
        res.redirect('/ta-4/ta-task-list')
      }
})

// router.get(/twoCallAttendees/ , function (req, res) {
//     if (req.query.radioGroup === "yes") {
//         res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('meds-addtional')
//     }
// })

router.post('/ta-4/attendees' , function (req, res) {
    if (req.session.data['appointee'] == "yes") {
        res.redirect('/ta-4/attendee-details')
      } else {
        res.redirect('/ta-4/conditions-additional')
      }
})

// router.get(/fiveAttendeeInfo/ , function (req, res) {
//     if (req.query.radioGroup === "yes") {
//         res.redirect('attendee-details') // in input value is "yes" = redirect to 'page-name' //
//     }
//     else {
//         res.redirect('meds-additional')
//     }
// })

router.post('/ta-4/another-attendee' , function (req, res) {
    if (req.session.data['another-attendee'] == "yes") {
        res.redirect('/ta-4/attendee-details')
      } else {
        res.redirect('/ta-4/conditions-additional')
      }
})

router.get(/callConditions/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-additional')
    }
})

router.post('/ta-4/conditions-additional' , function (req, res) {
    if (req.session.data['add-another-condition'] == "Yes") {
        res.redirect('/ta-4/conditions2')
      } else {
        res.redirect('/ta-4/meds-additional')
      }
})

router.post('/ta-4/appointee-answers' , function (req, res) {
    if (req.session.data['add-another-attendee'] == "Yes") {
        res.redirect('/ta-4/attendee-details')
      } else {
        res.redirect('/ta-4/conditions-additional')
      }
})

router.post('/ta-4/meds-additional' , function (req, res) {
    if (req.session.data['add-another-med'] == "Yes") {
        res.redirect('/ta-4/meds2')
      } else {
        res.redirect('/ta-4/treatment-additional')
      }
})

router.post('/ta-4/treatment-additional' , function (req, res) {
    if (req.session.data['add-treatment'] == "Yes") {
        res.redirect('/ta-4/treatment22')
      } else {
        res.redirect('/ta-4/soch1-additional')
      }
})

router.post('/ta-4/conditions2' , function (req, res) {
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

   res.redirect('/ta-4/conditions-additional')

})

router.post('/ta-4/evidence' , function (req, res) {
    const documentDate = req.session.data['document-date']
    const evidenceType = req.session.data['evidenceusedpip']

    const evidence = req.session.data.evidence || []
    evidence.push({ documentDate, evidenceType })
    req.session.data.evidence = evidence
  
    req.session.data.evidence[req.session.data.evidence.length - 1].action

   res.redirect('/ta-4/ta-task-list')

})

router.post('/ta-4/attendee-details' , function (req, res) {
    const name = req.session.data['attendee-name']
    const relationshipToClaimant = req.session.data['attendee-relationship']

    const queriesAttendee = req.session.data.queriesAttendee || []
    queriesAttendee.push({ name, relationshipToClaimant })
    req.session.data.queriesAttendee = queriesAttendee
  
    req.session.data.queriesAttendee[req.session.data.queriesAttendee.length - 1].action

   res.redirect('/ta-4/appointee-answers')

})
router.get(/callMeds/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('meds-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('treatment-additional')
    }
})

router.get(/callTreatment/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('soch1-additional')
    }
})

router.post('/ta-4/consent' , function (req, res) {
    if (req.session.data['consent'] == "no") {
        res.redirect('/ta-4/no-consent')

      } else {
        res.redirect('/ta-4/attendees')
      }
      
})

router.post('/ta-4/verify-id' , function (req, res) {
    if (req.session.data['verify'] == "pass") {
        res.redirect('/ta-4/consent')

      } else {
        res.redirect('/ta-4/not-verified')
      }
      
})

router.post('/ta-4/end-why' , function (req, res) {
    if (req.session.data['abandon'] == "Complete the assessment without a full consultation") {
        res.redirect('/ta-4/assessment-without-consultation')

      } else  if (req.session.data['abandon'] == "Book another consultation for this claimant") {
        res.redirect('/ta-4/book-another')

      } else  if (req.session.data['abandon'] == "Mark as assessment not completed") {
        res.redirect('/ta-4/not-complete')

      }  else  if (req.session.data['abandon'] == "Record unacceptable claimant behaviour") {
        res.redirect('/ta-4/unacceptable-behaviour')
      }
})

router.post('/ta-4/claimant-available' , function (req, res) {
    if (req.session.data['take-call'] == "unavailable-evidence") {
        res.redirect('/ta-4/verify-id')

      } else  if (req.session.data['take-call'] == "answerNo") {
        res.redirect('/ta-4/not-taken-call')

      } else  if (req.session.data['take-call'] == "failed-attend") {
        res.redirect('/ta-4/no-answer-after-three')
      }
})


router.post('/ta-4/not-taken-call' , function (req, res) {
    if (req.session.data['assessment'] == "unavailable-evidence") {
        res.redirect('/ta-4/assessment-without-consultation')
      } else  if (req.session.data['assessment'] == "book-consultation") {
        res.redirect('/ta-4/consultation-to-be-booked')
      } else  if (req.session.data['assessment'] == "failed-attend") {
        res.redirect('/ta-4/failed-to-attend')
      }
})


// IT 5 ROUTES //

router.post('/ta-5/add-condition', function (req, res) {
    if (req.session.data['anotherCondition'] == "Yes") {
        res.redirect('/ta-5/conditions')
      } else {
        res.redirect('/ta-5/ta-task-list')
      }
})

router.post('/ta-5/conditions', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action
  
   res.redirect('/ta-5/add-condition')
  })

router.post('/ta-5/meds-treatment2' , function (req, res) {
    if (req.session.data['another-med'] == "Yes") {
        res.redirect('/ta-5/meds')
      } else {
        res.redirect('/ta-5/ta-task-list')
      }
})

router.post('/ta-5/meds', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['meds-side-effects']
    const additonalInfo = req.session.data['addInfo']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-5/meds-treatment2')
  })

  router.post('/ta-5/meds2', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const medicationName = req.session.data['meds-name']
    const medicationDose = req.session.data['meds-dose']
    const medicationFrequency = req.session.data['meds-frequency']
    const medicationEfficacy = req.session.data['meds-efficacy']
    const medSideEffect = req.session.data['side-effects']
    const medicationSideEffects = req.session.data['side-effects-detail']
    const additonalInfo = req.session.data['additional-info']

    const queriesMedication = req.session.data.queriesMedication || []
    queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medicationSideEffects, medSideEffect, additonalInfo })
    req.session.data.queriesMedication = queriesMedication
  
    req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action
  
   res.redirect('/ta-5/meds-additional')
  })

  router.post('/ta-5/treatment22', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-5/treatment-additional')
  })

  router.post('/ta-5/treatment', function(req, res) {
    console.log('is-this-calling', req.session.data)
    const treatmentType = req.session.data['treatment-type']
    const treatmentFrequency = req.session.data['frequency']
    const additionalInfo = req.session.data['addInfo']

    const queriesTreatment = req.session.data.queriesTreatment || []
    queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
    req.session.data.queriesTreatment = queriesTreatment
  
    req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action
  
   res.redirect('/ta-5/treatment2')
  })

  router.post('/ta-5/daily-living', function(req, res) {
    
    res.redirect('/ta-5/ta-task-list6')
   })

   router.post('/ta-5/mobility', function(req, res) {
    
    res.redirect('/ta-5/ta-task-list7')
   })

  router.post('/ta-5/daily-living/preparingfood', function(req, res) {
    
   res.redirect('/ta-5/daily-living2')
  })
  
  router.post('/ta-5/daily-living/takingnutrition', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/managingtherapy', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/washingbathing', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/toiletneeds', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/dressing', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/communicatingverbally', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/readingunderstanding', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/facetoface', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/daily-living/budgeting', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/journeys', function(req, res) {
    
    res.redirect('/ta-5/mobility')
   })

   router.post('/ta-5/movingaround', function(req, res) {
    
    res.redirect('/ta-5/mobility')
   })
   
   router.post('/ta-5/daily-living-justification', function(req, res) {
    
    res.redirect('/ta-5/daily-living2')
   })

   router.post('/ta-5/dl-qual', function(req, res) {
    
    res.redirect('/ta-5/mobility-qual')
   })

   // mobility qualiffying period
   router.post('/ta-5/mobility-qual', function(req, res) {
    
    res.redirect('/ta-5/ta-task-list9')
   })

   // Review period route
   router.post('/ta-5/review', function(req, res) {
    
    res.redirect('/ta-5/ta-task-list10')
   })

    router.post('/ta-5/ta-task-list10', function(req, res) {
    
        res.redirect('/ta-5/report')
       })

router.post('/ta-5/treatment2' , function (req, res) {
    if (req.session.data['another-treatment'] == "Yes") {
        res.redirect('/ta-5/treatment')
      } else {
        res.redirect('/ta-5/ta-task-list')
      }
})


router.post('/ta-5/attendees' , function (req, res) {
    if (req.session.data['appointee'] == "yes") {
        res.redirect('/ta-5/attendee-details')
      } else {
        res.redirect('/ta-5/conditions-additional')
      }
})



router.post('/ta-5/another-attendee' , function (req, res) {
    if (req.session.data['another-attendee'] == "yes") {
        res.redirect('/ta-5/attendee-details')
      } else {
        res.redirect('/ta-5/conditions-additional')
      }
})

router.get(/callConditions/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('meds-additional')
    }
})

router.post('/ta-5/conditions-additional' , function (req, res) {
    if (req.session.data['add-another-condition'] == "Yes") {
        res.redirect('/ta-5/conditions2')
      } else {
        res.redirect('/ta-5/meds-additional')
      }
})

router.post('/ta-5/appointee-answers' , function (req, res) {
    if (req.session.data['add-another-attendee'] == "Yes") {
        res.redirect('/ta-5/attendee-details')
      } else {
        res.redirect('/ta-5/conditions-additional')
      }
})

router.post('/ta-5/meds-additional' , function (req, res) {
    if (req.session.data['add-another-med'] == "Yes") {
        res.redirect('/ta-5/meds2')
      } else {
        res.redirect('/ta-5/treatment-additional')
      }
})

router.post('/ta-5/treatment-additional' , function (req, res) {
    if (req.session.data['add-treatment'] == "Yes") {
        res.redirect('/ta-5/treatment22')
      } else {
        res.redirect('/ta-5/soch1-additional')
      }
})

router.post('/ta-5/conditions2' , function (req, res) {
    const condition = req.session.data['condition-name']
    const conditionLength = req.session.data['condition-length']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']

    const queriesCondition = req.session.data.queriesCondition || []
    queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
    req.session.data.queriesCondition = queriesCondition
  
    req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

   res.redirect('/ta-5/conditions-additional')

})

router.post('/ta-5/evidence' , function (req, res) {
    const documentDate = req.session.data['document-date']
    const evidenceType = req.session.data['evidenceusedpip']

    const evidence = req.session.data.evidence || []
    evidence.push({ documentDate, evidenceType })
    req.session.data.evidence = evidence
  
    req.session.data.evidence[req.session.data.evidence.length - 1].action

   res.redirect('/ta-5/ta-task-list')

})

router.post('/ta-5/attendee-details' , function (req, res) {
    const name = req.session.data['attendee-name']
    const relationshipToClaimant = req.session.data['attendee-relationship']

    const queriesAttendee = req.session.data.queriesAttendee || []
    queriesAttendee.push({ name, relationshipToClaimant })
    req.session.data.queriesAttendee = queriesAttendee
  
    req.session.data.queriesAttendee[req.session.data.queriesAttendee.length - 1].action

   res.redirect('/ta-5/appointee-answers')

})
router.get(/callMeds/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('meds-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('treatment-additional')
    }
})

router.get(/callTreatment/ , function (req, res) {
    if (req.query.radioGroup === "Yes") {
        res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
    }
    else {
        res.redirect('soch1-additional')
    }
})

router.post('/ta-5/consent' , function (req, res) {
    if (req.session.data['consent'] == "no") {
        res.redirect('/ta-5/no-consent')

      } else {
        res.redirect('/ta-5/attendees')
      }
      
})

router.post('/ta-5/verify-id' , function (req, res) {
    if (req.session.data['verify'] == "pass") {
        res.redirect('/ta-5/consent')

      } else {
        res.redirect('/ta-5/not-verified')
      }
      
})

router.post('/ta-5/end-why' , function (req, res) {
    if (req.session.data['abandon'] == "Complete the assessment with available evidence") {
        res.redirect('/ta-5/consultation-abandoned')

      } else  if (req.session.data['abandon'] == "Send to admin") {
        res.redirect('/ta-5/book-another')

      } else  if (req.session.data['abandon'] == "Book another") {
        res.redirect('/ta-5/book-assessment')

      } else  if (req.session.data['abandon'] == "Mark as assessment not completed") {
        res.redirect('/ta-5/not-complete')

      }  else  if (req.session.data['abandon'] == "Record unacceptable claimant behaviour") {
        res.redirect('/ta-5/unacceptable-behaviour')
      }

      else  if (req.session.data['abandon'] == "answerNoClaim") {
        res.redirect('/ta-5/no-longer-required')
      }
})

router.post('/ta-5/consultation-abandoned', function (req, res) {
  res.redirect('/ta-5/mental-state-abandon')
})

router.post('/ta-5/mental-state-abandon', function (req, res) {
  res.redirect('/ta-5/check-consultation-notes')
})

router.post('/ta-5/claimant-available' , function (req, res) {
    if (req.session.data['take-call'] == "unavailable-evidence") {
        res.redirect('/ta-5/verify-id')

      } else  if (req.session.data['take-call'] == "answerNo") {
        res.redirect('/ta-5/claimant-aware')

      } else  if (req.session.data['take-call'] == "failed-attend") {
        res.redirect('/ta-5/no-answer-after-three')
      
      } else  if (req.session.data['take-call'] == "answerNoClaim") {
      res.redirect('/ta-5/no-longer-required')
    }

      
})

router.post('/ta-5/claimant-aware' , function (req, res) {
  if (req.session.data['take-call'] == "answerYes") {
      res.redirect('/ta-5/failed-to-attend')

    } else  if (req.session.data['take-call'] == "answerNo") {
      res.redirect('/ta-5/claimant-not-aware')

    }
})

router.post('/ta-5/not-taken-call' , function (req, res) {
    if (req.session.data['assessment'] == "unavailable-evidence") {
        res.redirect('/ta-5/assessment-without-consultation')
      } else  if (req.session.data['assessment'] == "book-consultation") {
        res.redirect('/ta-5/consultation-to-be-booked')
      } else  if (req.session.data['assessment'] == "failed-attend") {
        res.redirect('/ta-5/failed-to-attend')
      }
})


// IT 6 ROUTES //

router.post('/ta-6/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/ta-6/conditions')
    } else {
      res.redirect('/ta-6/ta-task-list')
    }
})

router.post('/ta-6/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const conditionLength = req.session.data['condition-length']
  const conditionSymptoms = req.session.data['symptoms']
  const conditionVariability = req.session.data['variability']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/ta-6/add-condition')
})

router.post('/ta-6/meds-treatment2' , function (req, res) {
  if (req.session.data['another-med'] == "Yes") {
      res.redirect('/ta-6/meds')
    } else {
      res.redirect('/ta-6/ta-task-list')
    }
})

router.post('/ta-6/meds', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const medicationName = req.session.data['meds-name']
  const medicationDose = req.session.data['meds-dose']
  const medicationFrequency = req.session.data['meds-frequency']
  const medicationEfficacy = req.session.data['meds-efficacy']
  const medSideEffect = req.session.data['meds-side-effects']
  const additonalInfo = req.session.data['addInfo']

  const queriesMedication = req.session.data.queriesMedication || []
  queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medSideEffect, additonalInfo })
  req.session.data.queriesMedication = queriesMedication

  req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action

 res.redirect('/ta-6/meds-treatment2')
})

router.post('/ta-6/meds2', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const medicationName = req.session.data['meds-name']
  const medicationDose = req.session.data['meds-dose']
  const medicationFrequency = req.session.data['meds-frequency']
  const medicationEfficacy = req.session.data['meds-efficacy']
  const medSideEffect = req.session.data['side-effects']
  const medicationSideEffects = req.session.data['side-effects-detail']
  const additonalInfo = req.session.data['additional-info']

  const queriesMedication = req.session.data.queriesMedication || []
  queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medicationSideEffects, medSideEffect, additonalInfo })
  req.session.data.queriesMedication = queriesMedication

  req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action

 res.redirect('/ta-6/meds-additional')
})

router.post('/ta-6/treatment22', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const treatmentType = req.session.data['treatment-type']
  const treatmentFrequency = req.session.data['frequency']
  const additionalInfo = req.session.data['addInfo']

  const queriesTreatment = req.session.data.queriesTreatment || []
  queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
  req.session.data.queriesTreatment = queriesTreatment

  req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action

 res.redirect('/ta-6/treatment-additional')
})

router.post('/ta-6/treatment', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const treatmentType = req.session.data['treatment-type']
  const treatmentFrequency = req.session.data['frequency']
  const additionalInfo = req.session.data['addInfo']

  const queriesTreatment = req.session.data.queriesTreatment || []
  queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
  req.session.data.queriesTreatment = queriesTreatment

  req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action

 res.redirect('/ta-6/treatment2')
})

router.post('/ta-6/daily-living', function(req, res) {
  
  res.redirect('/ta-6/ta-task-list6')
 })

 router.post('/ta-6/mobility', function(req, res) {
  
  res.redirect('/ta-6/ta-task-list7')
 })

router.post('/ta-6/daily-living/preparingfood', function(req, res) {
  
 res.redirect('/ta-6/daily-living2')
})

router.post('/ta-6/daily-living/takingnutrition', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/managingtherapy', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/washingbathing', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/toiletneeds', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/dressing', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/communicatingverbally', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/readingunderstanding', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/facetoface', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/daily-living/budgeting', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/journeys', function(req, res) {
  
  res.redirect('/ta-6/mobility')
 })

 router.post('/ta-6/movingaround', function(req, res) {
  
  res.redirect('/ta-6/mobility')
 })
 
 router.post('/ta-6/daily-living-justification', function(req, res) {
  
  res.redirect('/ta-6/daily-living2')
 })

 router.post('/ta-6/dl-qual', function(req, res) {
  
  res.redirect('/ta-6/mobility-qual')
 })

 // mobility qualiffying period
 router.post('/ta-6/mobility-qual', function(req, res) {
  
  res.redirect('/ta-6/ta-task-list9')
 })

 // Review period route
 router.post('/ta-6/review', function(req, res) {
  
  res.redirect('/ta-6/ta-task-list10')
 })

  router.post('/ta-6/ta-task-list10', function(req, res) {
  
      res.redirect('/ta-6/report')
     })

router.post('/ta-6/treatment2' , function (req, res) {
  if (req.session.data['another-treatment'] == "Yes") {
      res.redirect('/ta-6/treatment')
    } else {
      res.redirect('/ta-6/ta-task-list')
    }
})


router.post('/ta-6/attendees' , function (req, res) {
  if (req.session.data['appointee'] == "yes") {
      res.redirect('/ta-6/attendee-details')
    } else {
      res.redirect('/ta-6/conditions-additional')
    }
})



router.post('/ta-6/another-attendee' , function (req, res) {
  if (req.session.data['another-attendee'] == "yes") {
      res.redirect('/ta-6/attendee-details')
    } else {
      res.redirect('/ta-6/conditions-additional')
    }
})

router.get(/callConditions/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('meds-additional')
  }
})

router.post('/ta-6/conditions-additional' , function (req, res) {
  if (req.session.data['add-another-condition'] == "Yes") {
      res.redirect('/ta-6/conditions2')
    } else {
      res.redirect('/ta-6/meds-additional')
    }
})

router.post('/ta-6/appointee-answers' , function (req, res) {
  if (req.session.data['add-another-attendee'] == "Yes") {
      res.redirect('/ta-6/attendee-details')
    } else {
      res.redirect('/ta-6/conditions-additional')
    }
})

router.post('/ta-6/meds-additional' , function (req, res) {
  if (req.session.data['add-another-med'] == "Yes") {
      res.redirect('/ta-6/meds2')
    } else {
      res.redirect('/ta-6/treatment-additional')
    }
})

router.post('/ta-6/treatment-additional' , function (req, res) {
  if (req.session.data['add-treatment'] == "Yes") {
      res.redirect('/ta-6/treatment22')
    } else {
      res.redirect('/ta-6/soch1-additional')
    }
})

router.post('/ta-6/conditions2' , function (req, res) {
  const condition = req.session.data['condition-name']
  const conditionLength = req.session.data['condition-length']
  const conditionSymptoms = req.session.data['symptoms']
  const conditionVariability = req.session.data['variability']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/ta-6/conditions-additional')

})

router.post('/ta-6/evidence' , function (req, res) {
  const documentDate = req.session.data['document-date']
  const evidenceType = req.session.data['evidenceusedpip']

  const evidence = req.session.data.evidence || []
  evidence.push({ documentDate, evidenceType })
  req.session.data.evidence = evidence

  req.session.data.evidence[req.session.data.evidence.length - 1].action

 res.redirect('/ta-6/ta-task-list')

})

router.post('/ta-6/attendee-details' , function (req, res) {
  const name = req.session.data['attendee-name']
  const relationshipToClaimant = req.session.data['attendee-relationship']

  const queriesAttendee = req.session.data.queriesAttendee || []
  queriesAttendee.push({ name, relationshipToClaimant })
  req.session.data.queriesAttendee = queriesAttendee

  req.session.data.queriesAttendee[req.session.data.queriesAttendee.length - 1].action

 res.redirect('/ta-6/appointee-answers')

})
router.get(/callMeds/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('meds-additional-add') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('treatment-additional')
  }
})

router.get(/callTreatment/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('soch1-additional')
  }
})

router.post('/ta-6/consent' , function (req, res) {
  if (req.session.data['consent'] == "no") {
      res.redirect('/ta-6/no-consent')

    } else {
      res.redirect('/ta-6/attendees')
    }
    
})

router.post('/ta-6/verify-id' , function (req, res) {
  if (req.session.data['verify'] == "pass") {
      res.redirect('/ta-6/consent')

    } else {
      res.redirect('/ta-6/not-verified')
    }
    
})

router.post('/ta-6/end-why' , function (req, res) {
  if (req.session.data['abandon'] == "Complete the assessment with available evidence") {
      res.redirect('/ta-6/assessment-without-consultation')

    } else  if (req.session.data['abandon'] == "Send to admin") {
      res.redirect('/ta-6/book-another')

    } else  if (req.session.data['abandon'] == "Mark as assessment not completed") {
      res.redirect('/ta-6/not-complete')

    }  else  if (req.session.data['abandon'] == "Record unacceptable claimant behaviour") {
      res.redirect('/ta-6/unacceptable-behaviour')
    }

    else  if (req.session.data['abandon'] == "answerNoClaim") {
      res.redirect('/ta-6/no-longer-required')
    }
})

router.post('/ta-6/claimant-available' , function (req, res) {
  if (req.session.data['take-call'] == "unavailable-evidence") {
      res.redirect('/ta-6/verify-id')

    } else  if (req.session.data['take-call'] == "answerNo") {
      res.redirect('/ta-6/status-failed-to-attend')

    } else  if (req.session.data['take-call'] == "failed-attend") {
      res.redirect('/ta-6/no-answer-after-three')
    
    } else  if (req.session.data['take-call'] == "answerNoClaim") {
    res.redirect('/ta-6/no-longer-required')
  }

})


router.post('/ta-6/not-taken-call' , function (req, res) {
  if (req.session.data['assessment'] == "unavailable-evidence") {
      res.redirect('/ta-6/assessment-without-consultation')
    } else  if (req.session.data['assessment'] == "book-consultation") {
      res.redirect('/ta-6/consultation-to-be-booked')
    } else  if (req.session.data['assessment'] == "failed-attend") {
      res.redirect('/ta-6/failed-to-attend')
    }
})

// start of v7 routes // 

router.post('/ta-7/conditions', function(req, res) {
  
  res.redirect('/ta-7/soch1-additional')
 })
 
 router.post('/ta-7/soch1-additional', function(req, res) {
   
   res.redirect('/ta-7/preparingfood')
  })
 
 router.post('/ta-7/attendees' , function (req, res) {
   
       res.redirect('/ta-7/conditions')
 })
 
 router.post('/ta-7/evidence' , function (req, res) {
  console.log('is-this-calling-questions', req.session.data)
   const documentDate = req.session.data['document-date']
   const evidenceType = req.session.data['evidenceusedpip']
   const section = req.session.data.source

   const evidence = req.session.data.evidence || []
   evidence.push({ documentDate, evidenceType, section })
   req.session.data.evidence = evidence


   console.log(section)
 
   req.session.data.evidence[req.session.data.evidence.length - 1].action
 
  res.redirect('/ta-7/verify-id')
 
 })
 
 router.post('/ta-7/consent' , function (req, res) {
   if (req.session.data['consent'] == "no") {
       res.redirect('/ta-7/no-consent')
 
     } else {
       res.redirect('/ta-7/attendees')
     }
     
 })
 
 router.post('/ta-7/verify-id' , function (req, res) {
   if (req.session.data['verify'] == "pass") {
       res.redirect('/ta-7/consent')
 
     } else {
       res.redirect('/ta-7/not-verified')
     }
     
 })
// Telephone assessment v7 - side nav design activities //

router.post('/ta-7/preparingfood', function (req, res) {
 
  res.redirect('/ta-7/takingnutrition')

})

router.post('/ta-7/takingnutrition', function (req, res) {
 
  res.redirect('/ta-7/managingtherapy')
})

router.post('/ta-7/managingtherapy', function (req, res) {
 
  res.redirect('/ta-7/washingbathing')
})

router.post('/ta-7/washingbathing', function (req, res) {
 
  res.redirect('/ta-7/toiletneeds')
})

router.post('/ta-7/toiletneeds', function (req, res) {
 
  res.redirect('/ta-7/dressing')
})

router.post('/ta-7/dressing', function (req, res) {
 
  res.redirect('/ta-7/communicatingverbally')
})

router.post('/ta-7/communicatingverbally', function (req, res) {
 
  res.redirect('/ta-7/readingunderstanding')
})

router.post('/ta-7/readingunderstanding', function (req, res) {
 
  res.redirect('/ta-7/facetoface')
})

router.post('/ta-7/facetoface', function (req, res) {
 
  res.redirect('/ta-7/budgeting')
})

router.post('/ta-7/budgeting', function (req, res) {
 
  res.redirect('/ta-7/journeys')
})

router.post('/ta-7/journeys', function (req, res) {
 
  res.redirect('/ta-7/movingaround')
})

router.post('/ta-7/movingaround' , function (req, res) {
 
  res.redirect('/ta-7/mental-state')
})

router.post('/ta-7/mental-state', function (req, res) {
 
  res.redirect('/ta-7/physical-state')
})

router.post('/ta-7/physical-state', function (req, res) {
 
  res.redirect('/ta-7/dl-qual')
})

router.post('/ta-7/dl-qual', function (req, res) {
 
  res.redirect('/ta-7/daily-living')
})

router.post('/ta-7/daily-living', function (req, res) {
 
  res.redirect('/ta-7/mobility-qual')
})

router.post('/ta-7/mobility-qual', function (req, res) {
 
  res.redirect('/ta-7/mobility')
})

router.post('/ta-7/mobility', function(req, res) {
  
  res.redirect('/ta-7/review')
 })

 router.post('/ta-7/review', function(req, res) {
  
  res.redirect('/ta-7/report')
 })

 // start of v8 routes // 

router.post('/ta-8/conditions', function(req, res) {
  
  res.redirect('/ta-8/soch1-additional')
 })
 
 router.post('/ta-8/soch1-additional', function(req, res) {
   
   res.redirect('/ta-8/preparingfood')
  })
 
 router.post('/ta-8/attendees' , function (req, res) {
   
       res.redirect('/ta-8/conditions')
 })
 
 router.post('/ta-8/evidence' , function (req, res) {
  console.log('is-this-calling-questions', req.session.data)
   const documentDate = req.session.data['document-date']
   const evidenceType = req.session.data['evidenceusedpip']
   const section = req.session.data.source

   const evidence = req.session.data.evidence || []
   evidence.push({ documentDate, evidenceType, section })
   req.session.data.evidence = evidence


   console.log(section)
 
   req.session.data.evidence[req.session.data.evidence.length - 1].action
 
  res.redirect('/ta-8/verify-id')
 
 })
 
 router.post('/ta-8/consent' , function (req, res) {
   if (req.session.data['consent'] == "no") {
       res.redirect('/ta-8/no-consent')
 
     } else {
       res.redirect('/ta-8/attendees')
     }
     
 })
 
 router.post('/ta-8/verify-id' , function (req, res) {
   if (req.session.data['verify'] == "pass") {
       res.redirect('/ta-8/consent')
 
     } else {
       res.redirect('/ta-8/not-verified')
     }
     
 })
// Telephone assessment v8 - side nav design activities //

router.post('/ta-8/preparingfood', function (req, res) {
 
  res.redirect('/ta-8/takingnutrition')

})

router.post('/ta-8/takingnutrition', function (req, res) {
 
  res.redirect('/ta-8/managingtherapy')
})

router.post('/ta-8/managingtherapy', function (req, res) {
 
  res.redirect('/ta-8/washingbathing')
})

router.post('/ta-8/washingbathing', function (req, res) {
 
  res.redirect('/ta-8/toiletneeds')
})

router.post('/ta-8/toiletneeds', function (req, res) {
 
  res.redirect('/ta-8/dressing')
})

router.post('/ta-8/dressing', function (req, res) {
 
  res.redirect('/ta-8/communicatingverbally')
})

router.post('/ta-8/communicatingverbally', function (req, res) {
 
  res.redirect('/ta-8/readingunderstanding')
})

router.post('/ta-8/readingunderstanding', function (req, res) {
 
  res.redirect('/ta-8/facetoface')
})

router.post('/ta-8/facetoface', function (req, res) {
 
  res.redirect('/ta-8/budgeting')
})

router.post('/ta-8/budgeting', function (req, res) {
 
  res.redirect('/ta-8/journeys')
})

router.post('/ta-8/journeys', function (req, res) {
 
  res.redirect('/ta-8/movingaround')
})

router.post('/ta-8/movingaround' , function (req, res) {
 
  res.redirect('/ta-8/mental-state')
})

router.post('/ta-8/mental-state', function (req, res) {
 
  res.redirect('/ta-8/physical-state')
})

router.post('/ta-8/physical-state', function (req, res) {
 
  res.redirect('/ta-8/dl-qual')
})

router.post('/ta-8/dl-qual', function (req, res) {
 
  res.redirect('/ta-8/daily-living')
})

router.post('/ta-8/daily-living', function (req, res) {
 
  res.redirect('/ta-8/mobility-qual')
})

router.post('/ta-8/mobility-qual', function (req, res) {
 
  res.redirect('/ta-8/mobility')
})

router.post('/ta-8/mobility', function(req, res) {
  
  res.redirect('/ta-8/review')
 })

 router.post('/ta-8/review', function(req, res) {
  
  res.redirect('/ta-8/report')
 })


// Versioning routes //

// evidence
router.post('/audit-versioning/evidence-used' , function (req, res) {
      res.redirect('/audit-versioning/task-list')
})

// medical conditions, medications and treatments
router.post('/audit-versioning/conditions-medications-treatments' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// variability
router.post('/audit-versioning/variability' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// functional history
router.post('/audit-versioning/functional-history' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// social history
router.post('/audit-versioning/social-history' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// descriptor choices
router.post('/audit-versioning/descriptor-choices' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// justifications
router.post('/audit-versioning/justifications' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})


// observations
router.post('/audit-versioning/observations' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// review period
router.post('/audit-versioning/review-period' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})

// audit outcome
router.post('/audit-versioning/audit-outcome' , function (req, res) {
  res.redirect('/audit-versioning/task-list')
})




// SREL routes

//Evidence
router.post('/SREL/evidence' , function (req, res) {
  res.redirect('/SREL/tasklist')
})

// Conditions
router.post('/SREL/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const harmfulInfo = req.session.data['harmful']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, harmfulInfo })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/SREL/add-condition')
})

router.post('/SREL/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/SREL/conditions')
    } else {
      res.redirect('/SREL/tasklist')
    }
})

//Special rules
router.post('/SREL/special-rules', function (req, res) {
  if (req.session.data['specialRules'] == "Yes") {
      res.redirect('/SREL/special-rules-date')
    } else {
      res.redirect('/SREL/justification')
    }
})

router.post('/SREL/special-rules-date' , function (req, res) {
  res.redirect('/SREL/mobility')
})

router.post('/SREL/mobility' , function (req, res) {
  res.redirect('/SREL/tasklist')
})

//Shortcall
router.post('/SREL/shortcall' , function (req, res) {
  res.redirect('/SREL/tasklist')
})

// Mobility descriptors
router.post('/SREL/journeys' , function (req, res) {
  res.redirect('/SREL/mobility')
})

router.post('/SREL/moving-around' , function (req, res) {
  res.redirect('/SREL/mobility')
})

//Justification
router.post('/SREL/justification' , function (req, res) {
  res.redirect('/SREL/tasklist')
})

//Report
router.post('/SREL/report' , function (req, res) {
  res.redirect('/SREL/submit')
})


// SREL-2 routes //

//Evidence
router.post('/SREL-2/evidence' , function (req, res) {
  res.redirect('/SREL-2/short-call')
})

// Conditions
router.post('/SREL-2/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const harmfulInfo = req.session.data['harmful']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, harmfulInfo })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/SREL-2/add-condition')
})

router.post('/SREL-2/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/SREL-2/conditions')
    } else {
      res.redirect('/SREL-2/special-rules')
    }
})

//Special rules
router.post('/SREL-2/special-rules', function (req, res) {
  if (req.session.data['specialRules'] == "Yes") {
      res.redirect('/SREL-2/special-rules-yes')
    } else {
      res.redirect('/SREL-2/justification')
    }
})

router.post('/SREL-2/special-rules-yes' , function (req, res) {
  res.redirect('/SREL-2/special-rules-date')
})

router.post('/SREL-2/special-rules-date' , function (req, res) {
  res.redirect('/SREL-2/mobility')
})

router.post('/SREL-2/mobility' , function (req, res) {
  res.redirect('/SREL-2/mobility-justification')
})

router.post('/SREL-2/mobility-justification' , function (req, res) {
  res.redirect('/SREL-2/report')
})

router.post('/SREL-2/report' , function (req, res) {
  res.redirect('/SREL-2/report-two')
})

//Shortcall
router.post('/SREL-2/short-call' , function (req, res) {
  if (req.session.data['short-call'] == "Yes") {
    res.redirect('/SREL-2/shortcall')
  } else {
    res.redirect('/SREL-2/conditions')
  }
})

router.post('/SREL-2/shortcall' , function (req, res) {
  res.redirect('/SREL-2/conditions')
})

// Mobility descriptors
router.post('/SREL-2/journeys' , function (req, res) {
  res.redirect('/SREL-2/mobility')
})

router.post('/SREL-2/moving-around' , function (req, res) {
  res.redirect('/SREL-2/mobility')
})

//Justification
router.post('/SREL-2/justification' , function (req, res) {
  res.redirect('/SREL-2/report')
})

//Report
router.post('/SREL-2/report-two' , function (req, res) {
  res.redirect('/SREL-2/submit')
})

// SREL-2-1 routes //

//Evidence
router.post('/SREL-2-1/evidence' , function (req, res) {
  res.redirect('/SREL-2-1/short-call')
})

// Conditions
router.post('/SREL-2-1/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const harmfulInfo = req.session.data['harmful']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, harmfulInfo })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/SREL-2-1/add-condition')
})

router.post('/SREL-2-1/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/SREL-2-1/conditions')
    } else {
      res.redirect('/SREL-2-1/special-rules')
    }
})

//Special rules
router.post('/SREL-2-1/special-rules', function (req, res) {
  if (req.session.data['specialRules'] == "Yes") {
      res.redirect('/SREL-2-1/special-rules-yes')
    } else {
      res.redirect('/SREL-2-1/justification')
    }
})

router.post('/SREL-2-1/special-rules-yes' , function (req, res) {
  res.redirect('/SREL-2-1/special-rules-date')
})

router.post('/SREL-2-1/special-rules-date' , function (req, res) {
  res.redirect('/SREL-2-1/mobility')
})

router.post('/SREL-2-1/mobility' , function (req, res) {
  res.redirect('/SREL-2-1/mobility-justification')
})

router.post('/SREL-2-1/mobility-justification' , function (req, res) {
  res.redirect('/SREL-2-1/report')
})

router.post('/SREL-2-1/report' , function (req, res) {
  res.redirect('/SREL-2-1/submit')
})

//Shortcall
router.post('/SREL-2-1/short-call' , function (req, res) {
  if (req.session.data['shortCall'] == "Yes") {
    res.redirect('/SREL-2-1/shortcall')
  } else {
    res.redirect('/SREL-2-1/conditions')
  }
})

router.post('/SREL-2-1/shortcall' , function (req, res) {
  res.redirect('/SREL-2-1/conditions')
})

// Mobility descriptors
router.post('/SREL-2-1/journeys' , function (req, res) {
  res.redirect('/SREL-2-1/mobility')
})

router.post('/SREL-2-1/moving-around' , function (req, res) {
  res.redirect('/SREL-2-1/mobility')
})

//Justification
router.post('/SREL-2-1/justification' , function (req, res) {
  res.redirect('/SREL-2-1/report')
})


// SREL-3 routes //

router.post('/SREL-3/evidence' , function (req, res) {
  res.redirect('/SREL-3/short-call')
})

// Conditions
router.post('/SREL-3/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const harmfulInfo = req.session.data['harmful']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, harmfulInfo })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/SREL-3/add-condition')
})

router.post('/SREL-3/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/SREL-3/conditions')
    } else {
      res.redirect('/SREL-3/special-rules')
    }
})

// Shortcalls
router.post('/SREL-3/shortcall', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const callName = req.session.data['short-call-name']
  const consultationNotes = req.session.data['consultation-notes']

  const queriesShortcall = req.session.data.queriesShortcall || []
  queriesShortcall.push({ callName, consultationNotes })
  req.session.data.queriesShortcall = queriesShortcall

  req.session.data.queriesShortcall[req.session.data.queriesShortcall.length - 1].action

 res.redirect('/SREL-3/add-shortcall')
})

router.post('/SREL-3/add-shortcall', function (req, res) {
  if (req.session.data['anotherShortcall'] == "Yes") {
      res.redirect('/SREL-3/shortcall')
    } else {
      res.redirect('/SREL-3/diagnosis')
    }
})

//Special rules
router.post('/SREL-3/special-rules', function (req, res) {
  if (req.session.data['specialRules'] == "Yes") {
      res.redirect('/SREL-3/special-rules-yes')
    } else {
      res.redirect('/SREL-3/justification')
    }
})

router.post('/SREL-3/special-rules-yes' , function (req, res) {
  res.redirect('/SREL-3/special-rules-date')
})

router.post('/SREL-3/special-rules-date' , function (req, res) {
  res.redirect('/SREL-3/mobility-eleven')
})

// mobility descriptors
router.post('/SREL-3/mobility-eleven' , function (req, res) {
  res.redirect('/SREL-3/mobility-twelve')
})

router.post('/SREL-3/mobility-twelve' , function (req, res) {
  if (req.session.data['diagnosis'] === "Yes" && req.session.data['prognosis'] === "Yes") {
    res.redirect('/SREL-3/report-cleanFull')
  } else {
    res.redirect('/SREL-3/report-h')
  }
})

router.post('/SREL-3/mobility-justification' , function (req, res) {
  res.redirect('/SREL-3/report')
})

router.post('/SREL-3/report' , function (req, res) {
  res.redirect('/SREL-3/submit')
})

//Shortcall
router.post('/SREL-3/short-call' , function (req, res) {
  if (req.session.data['shortCall'] == "Yes") {
    res.redirect('/SREL-3/shortcall')
  } else {
    res.redirect('/SREL-3/diagnosis')
  }
})

router.post('/SREL-3/shortcall' , function (req, res) {
  res.redirect('/SREL-3/add-shortcall')
})

router.post('/SREL-3/add-shortcall' , function (req, res) {
  res.redirect('/SREL-3/conditions')
})

// diagnosis - prognosis

router.post('/SREL-3/diagnosis', function (req, res) {
  if (req.session.data['diagnosis'] == "Yes") {
    res.redirect('/SREL-3/prognosis')
  } else {
    res.redirect('/SREL-3/prognosis')
  }
})

router.post('/SREL-3/prognosis', function (req, res) {
  if (req.session.data['prognosis'] == "Yes") {
    res.redirect('/SREL-3/conditions')
  } else {
    res.redirect('/SREL-3/conditions')
  }
})

//Justification
router.post('/SREL-3/report-h' , function (req, res) {
  res.redirect('/SREL-3/assessment-report')
})

router.post('/SREL-3/justification' , function (req, res) {
  res.redirect('/SREL-3/assessment-report')
})

router.post('/SREL-3/assessment-report' , function (req, res) {
  res.redirect('/SREL-3/submit')
})

router.post('/SREL-3/report-cleanFull' , function (req, res) {
  res.redirect('/SREL-3/submit')
})


// SREL-4 routes //

router.post('/SREL-4/evidence' , function (req, res) {
  res.redirect('/SREL-4/short-call')
})

// Conditions
router.post('/SREL-4/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const harmfulInfo = req.session.data['harmful']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, harmfulInfo })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/SREL-4/add-condition')
})

router.post('/SREL-4/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/SREL-4/conditions')
    } else {
      res.redirect('/SREL-4/special-rules')
    }
})

// Shortcalls
router.post('/SREL-4/shortcall', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const callName = req.session.data['short-call-name']
  const consultationNotes = req.session.data['consultation-notes']

  const queriesShortcall = req.session.data.queriesShortcall || []
  queriesShortcall.push({ callName, consultationNotes })
  req.session.data.queriesShortcall = queriesShortcall

  req.session.data.queriesShortcall[req.session.data.queriesShortcall.length - 1].action

 res.redirect('/SREL-4/add-shortcall')
})

router.post('/SREL-4/add-shortcall', function (req, res) {
  if (req.session.data['anotherShortcall'] == "Yes") {
      res.redirect('/SREL-4/shortcall')
    } else {
      res.redirect('/SREL-4/diagnosis')
    }
})

//Special rules
router.post('/SREL-4/special-rules', function (req, res) {
  if (req.session.data['specialRules'] == "Yes") {
      res.redirect('/SREL-4/special-rules-yes')
    } else {
      res.redirect('/SREL-4/justification')
    }
})

router.post('/SREL-4/special-rules-yes' , function (req, res) {
  res.redirect('/SREL-4/special-rules-date')
})

router.post('/SREL-4/special-rules-date' , function (req, res) {
  res.redirect('/SREL-4/mobility-eleven')
})

// mobility descriptors
router.post('/SREL-4/mobility-eleven' , function (req, res) {
  res.redirect('/SREL-4/mobility-twelve')
})

router.post('/SREL-4/mobility-twelve' , function (req, res) {
  if (req.session.data['diagnosis'] === "Yes" && req.session.data['prognosis'] === "Yes") {
    res.redirect('/SREL-4/report-cleanFull')
  } else {
    res.redirect('/SREL-4/report-h')
  }
})

router.post('/SREL-4/mobility-justification' , function (req, res) {
  res.redirect('/SREL-4/report')
})

router.post('/SREL-4/report' , function (req, res) {
  res.redirect('/SREL-4/submit')
})

//Shortcall
router.post('/SREL-4/short-call' , function (req, res) {
  if (req.session.data['shortCall'] == "Yes") {
    res.redirect('/SREL-4/shortcall')
  } else {
    res.redirect('/SREL-4/diagnosis')
  }
})

router.post('/SREL-4/shortcall' , function (req, res) {
  res.redirect('/SREL-4/add-shortcall')
})

router.post('/SREL-4/add-shortcall' , function (req, res) {
  res.redirect('/SREL-4/conditions')
})

// diagnosis - prognosis

router.post('/SREL-4/diagnosis', function (req, res) {
  if (req.session.data['diagnosis'] == "Yes") {
    res.redirect('/SREL-4/prognosis')
  } else {
    res.redirect('/SREL-4/prognosis')
  }
})

router.post('/SREL-4/prognosis', function (req, res) {
  if (req.session.data['prognosis'] == "Yes") {
    res.redirect('/SREL-4/conditions')
  } else {
    res.redirect('/SREL-4/conditions')
  }
})

//Justification
router.post('/SREL-4/report-h' , function (req, res) {
  res.redirect('/SREL-4/assessment-report')
})

router.post('/SREL-4/justification' , function (req, res) {
  res.redirect('/SREL-4/assessment-report')
})

router.post('/SREL-4/assessment-report' , function (req, res) {
  res.redirect('/SREL-4/submit')
})

router.post('/SREL-4/report-cleanFull' , function (req, res) {
  res.redirect('/SREL-4/submit')
})




// PBR Routes

router.post('/pbr/add-condition', function (req, res) {
  if (req.session.data['anotherCondition'] == "Yes") {
      res.redirect('/pbr/conditions')
    } else {
      res.redirect('/pbr/ta-task-list')
    }
})

router.post('/pbr/conditions', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const condition = req.session.data['condition-name']
  const conditionLength = req.session.data['condition-length']
  const conditionSymptoms = req.session.data['symptoms']
  const conditionVariability = req.session.data['variability']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/pbr/add-condition')
})

router.post('/pbr/meds-treatment2' , function (req, res) {
  if (req.session.data['another-med'] == "Yes") {
      res.redirect('/pbr/meds')
    } else {
      res.redirect('/pbr/ta-task-list')
    }
})

router.post('/pbr/meds', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const medicationName = req.session.data['meds-name']
  const medicationDose = req.session.data['meds-dose']
  const medicationFrequency = req.session.data['meds-frequency']
  const medicationEfficacy = req.session.data['meds-efficacy']
  const medSideEffect = req.session.data['meds-side-effects']
  const additonalInfo = req.session.data['addInfo']

  const queriesMedication = req.session.data.queriesMedication || []
  queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medSideEffect, additonalInfo })
  req.session.data.queriesMedication = queriesMedication

  req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action

 res.redirect('/pbr/meds-treatment2')
})

router.post('/pbr/meds2', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const medicationName = req.session.data['meds-name']
  const medicationDose = req.session.data['meds-dose']
  const medicationFrequency = req.session.data['meds-frequency']
  const medicationEfficacy = req.session.data['meds-efficacy']
  const medSideEffect = req.session.data['side-effects']
  const medicationSideEffects = req.session.data['side-effects-detail']
  const additonalInfo = req.session.data['additional-info']

  const queriesMedication = req.session.data.queriesMedication || []
  queriesMedication.push({ medicationName, medicationDose, medicationFrequency, medicationEfficacy, medicationSideEffects, medSideEffect, additonalInfo })
  req.session.data.queriesMedication = queriesMedication

  req.session.data.queriesMedication[req.session.data.queriesMedication.length - 1].action

 res.redirect('/pbr/meds-additional')
})

router.post('/pbr/treatment22', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const treatmentType = req.session.data['treatment-type']
  const treatmentFrequency = req.session.data['frequency']
  const additionalInfo = req.session.data['addInfo']

  const queriesTreatment = req.session.data.queriesTreatment || []
  queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
  req.session.data.queriesTreatment = queriesTreatment

  req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action

 res.redirect('/pbr/treatment-additional')
})

router.post('/pbr/treatment', function(req, res) {
  console.log('is-this-calling', req.session.data)
  const treatmentType = req.session.data['treatment-type']
  const treatmentFrequency = req.session.data['frequency']
  const additionalInfo = req.session.data['addInfo']

  const queriesTreatment = req.session.data.queriesTreatment || []
  queriesTreatment.push({ treatmentType, treatmentFrequency, additionalInfo })
  req.session.data.queriesTreatment = queriesTreatment

  req.session.data.queriesTreatment[req.session.data.queriesTreatment.length - 1].action

 res.redirect('/pbr/treatment2')
})

router.post('/pbr/daily-living', function(req, res) {
  
  res.redirect('/pbr/ta-task-list6')
 })

 router.post('/pbr/mobility', function(req, res) {
  
  res.redirect('/pbr/ta-task-list7')
 })

router.post('/pbr/daily-living/preparingfood', function(req, res) {
  
 res.redirect('/pbr/daily-living2')
})

router.post('/pbr/daily-living/takingnutrition', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/managingtherapy', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/washingbathing', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/toiletneeds', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/dressing', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/communicatingverbally', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/readingunderstanding', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/facetoface', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/daily-living/budgeting', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/journeys', function(req, res) {
  
  res.redirect('/pbr/mobility')
 })

 router.post('/pbr/movingaround', function(req, res) {
  
  res.redirect('/pbr/mobility')
 })
 
 router.post('/pbr/daily-living-justification', function(req, res) {
  
  res.redirect('/pbr/daily-living2')
 })

 router.post('/pbr/dl-qual', function(req, res) {
  
  res.redirect('/pbr/mobility-qual')
 })

 // mobility qualiffying period
 router.post('/pbr/mobility-qual', function(req, res) {
  
  res.redirect('/pbr/ta-task-list9')
 })

 // Review period route
 router.post('/pbr/review', function(req, res) {
  
  res.redirect('/pbr/ta-task-list10')
 })

  router.post('/pbr/ta-task-list10', function(req, res) {
  
      res.redirect('/pbr/report')
     })

router.post('/pbr/treatment2' , function (req, res) {
  if (req.session.data['another-treatment'] == "Yes") {
      res.redirect('/pbr/treatment')
    } else {
      res.redirect('/pbr/ta-task-list')
    }
})


router.post('/pbr/attendees' , function (req, res) {
  if (req.session.data['appointee'] == "yes") {
      res.redirect('/pbr/attendee-details')
    } else {
      res.redirect('/pbr/conditions-additional')
    }
})



router.post('/pbr/another-attendee' , function (req, res) {
  if (req.session.data['another-attendee'] == "yes") {
      res.redirect('/pbr/attendee-details')
    } else {
      res.redirect('/pbr/conditions-additional')
    }
})

router.get(/callConditions/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('conditions') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('meds-additional')
  }
})

router.post('/pbr/conditions-additional' , function (req, res) {
  if (req.session.data['add-another-condition'] == "Yes") {
      res.redirect('/pbr/conditions2')
    } else {
      res.redirect('/pbr/meds-additional')
    }
})

router.post('/pbr/appointee-answers' , function (req, res) {
  if (req.session.data['add-another-attendee'] == "Yes") {
      res.redirect('/pbr/attendee-details')
    } else {
      res.redirect('/pbr/conditions-additional')
    }
})

router.post('/pbr/meds-additional' , function (req, res) {
  if (req.session.data['add-another-med'] == "Yes") {
      res.redirect('/pbr/meds2')
    } else {
      res.redirect('/pbr/treatment-additional')
    }
})

router.post('/pbr/treatment-additional' , function (req, res) {
  if (req.session.data['add-treatment'] == "Yes") {
      res.redirect('/pbr/treatment22')
    } else {
      res.redirect('/pbr/soch1-additional')
    }
})

router.post('/pbr/conditions2' , function (req, res) {
  const condition = req.session.data['condition-name']
  const conditionLength = req.session.data['condition-length']
  const conditionSymptoms = req.session.data['symptoms']
  const conditionVariability = req.session.data['variability']

  const queriesCondition = req.session.data.queriesCondition || []
  queriesCondition.push({ condition, conditionLength, conditionSymptoms, conditionVariability })
  req.session.data.queriesCondition = queriesCondition

  req.session.data.queriesCondition[req.session.data.queriesCondition.length - 1].action

 res.redirect('/pbr/conditions-additional')

})

router.post('/pbr/evidence' , function (req, res) {
  const documentDate = req.session.data['document-date']
  const evidenceType = req.session.data['evidenceusedpip']

  const evidence = req.session.data.evidence || []
  evidence.push({ documentDate, evidenceType })
  req.session.data.evidence = evidence

  req.session.data.evidence[req.session.data.evidence.length - 1].action

 res.redirect('/pbr/ta-task-list')

})

router.post('/ta-6/attendee-details' , function (req, res) {
  const name = req.session.data['attendee-name']
  const relationshipToClaimant = req.session.data['attendee-relationship']

  const queriesAttendee = req.session.data.queriesAttendee || []
  queriesAttendee.push({ name, relationshipToClaimant })
  req.session.data.queriesAttendee = queriesAttendee

  req.session.data.queriesAttendee[req.session.data.queriesAttendee.length - 1].action

 res.redirect('/ta-6/appointee-answers')

})
router.get(/callMeds/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('meds-additional-add') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('treatment-additional')
  }
})

router.get(/callTreatment/ , function (req, res) {
  if (req.query.radioGroup === "Yes") {
      res.redirect('treatment-additional-add') // in input value is "yes" = redirect to 'page-name' //
  }
  else {
      res.redirect('soch1-additional')
  }
})

router.post('/ta-6/consent' , function (req, res) {
  if (req.session.data['consent'] == "no") {
      res.redirect('/ta-6/no-consent')

    } else {
      res.redirect('/ta-6/attendees')
    }
    
})

router.post('/ta-6/verify-id' , function (req, res) {
  if (req.session.data['verify'] == "pass") {
      res.redirect('/ta-6/consent')

    } else {
      res.redirect('/ta-6/not-verified')
    }
    
})

router.post('/ta-6/end-why' , function (req, res) {
  if (req.session.data['abandon'] == "Complete the assessment with available evidence") {
      res.redirect('/ta-6/assessment-without-consultation')

    } else  if (req.session.data['abandon'] == "Send to admin") {
      res.redirect('/ta-6/book-another')

    } else  if (req.session.data['abandon'] == "Mark as assessment not completed") {
      res.redirect('/ta-6/not-complete')

    }  else  if (req.session.data['abandon'] == "Record unacceptable claimant behaviour") {
      res.redirect('/ta-6/unacceptable-behaviour')
    }

    else  if (req.session.data['abandon'] == "answerNoClaim") {
      res.redirect('/ta-6/no-longer-required')
    }
})

router.post('/ta-6/claimant-available' , function (req, res) {
  if (req.session.data['take-call'] == "unavailable-evidence") {
      res.redirect('/ta-6/verify-id')

    } else  if (req.session.data['take-call'] == "answerNo") {
      res.redirect('/ta-6/status-failed-to-attend')

    } else  if (req.session.data['take-call'] == "failed-attend") {
      res.redirect('/ta-6/no-answer-after-three')
    
    } else  if (req.session.data['take-call'] == "answerNoClaim") {
    res.redirect('/ta-6/no-longer-required')
  }

    
})


router.post('/ta-6/not-taken-call' , function (req, res) {
  if (req.session.data['assessment'] == "unavailable-evidence") {
      res.redirect('/ta-6/assessment-without-consultation')
    } else  if (req.session.data['assessment'] == "book-consultation") {
      res.redirect('/ta-6/consultation-to-be-booked')
    } else  if (req.session.data['assessment'] == "failed-attend") {
      res.redirect('/ta-6/failed-to-attend')
    }
})
router.use((req, res, next) => {
  const log = {
    method: req.method,
    url: req.originalUrl, //URL of page
    data: req.session.data //all data held
  }
  console.log(JSON.stringify(log, null, 2)) // show all data as a dump in terminal
  next() // continue to next action

})

// Prompts routes

 //Routes for adding first condition only
 router.post('/prompts/conditions', function(req, res) {

  const conditionName = req.session.data['condition-name-first']
  const conditionLength = req.session.data['condition-start']
  const diagnosis = req.session.data['diagnosis']
  const medicalcareTreatments = req.session.data['meds-care-treatments']
  const hospital = req.session.data['hospital-admission']
  const hospitalCheck = req.session.data['hospital-admission-check']
  const conditionSymptoms = req.session.data['symptoms']
  const conditionVariability = req.session.data['variability']
  const conditionVariabilityCheck = req.session.data['variability-check']
  const mentalHealth = req.session.data['mental-health-description']
  const mentalHealthCheck = req.session.data['mental-health-check']
  const functionalRestriction = req.session.data['functional-restriction']

  const firstConditionAdded = req.session.data.firstCondition || []
  firstConditionAdded.push({ conditionName, conditionLength, diagnosis, medicalcareTreatments, conditionSymptoms, hospital, hospitalCheck, conditionVariability, conditionVariabilityCheck, mentalHealth, mentalHealthCheck, functionalRestriction })
  req.session.data.firstConditionAdded = firstConditionAdded

  req.session.data.firstConditionAdded[req.session.data.firstConditionAdded.length - 1].action
  
  res.redirect('/prompts/conditions-add')
 })

 router.post('/prompts/conditions-addAnother', function(req, res) {
  res.redirect('/prompts/conditions-add')
})

// Routes for adding another condition
 router.post('/prompts/conditions-add', function(req, res) {
  const conditionAnother = req.session.data['condition-name-add']
  const conditionLengthAnother = req.session.data['condition-start-add']
  const diagnosisAnother = req.session.data['diagnosis-add']
  const medicalcareTreatmentsAnother = req.session.data['meds-care-treatments-add']
  const hospitalAnother = req.session.data['hospital-admission-add']
  const hospitalCheckbox = req.session.data['hospital-admission-check-add']
  const conditionSymptomsAnother = req.session.data['symptoms-add']
  const conditionVariabilityCheck = req.session.data['variability-check']
  const conditionVariabilityAnother = req.session.data['variability-add']
  const mentalHealthAnother = req.session.data['mental-health-description-add']
  const mentalHealthBox = req.session.data['mental-health-check']
  const functionalRestrictionAnother = req.session.data['functional-restriction-add']

  const OtherConditions = req.session.data.OtherConditions || []
  OtherConditions.push({ conditionAnother, conditionLengthAnother, diagnosisAnother, conditionSymptomsAnother, medicalcareTreatmentsAnother, hospitalAnother, hospitalCheckbox, conditionVariabilityAnother, conditionVariabilityCheck, mentalHealthAnother, mentalHealthBox, functionalRestrictionAnother })
  req.session.data.OtherConditions = OtherConditions

  req.session.data.OtherConditions[req.session.data.OtherConditions.length - 1].action
  
  res.redirect('/prompts/conditions-addAnother')
 })


 // Routes for prompts iteration two //

  // Routes for adding another condition
  router.post('/prompts-two/conditions-none', function(req, res) {
      
    res.redirect('/prompts-two/conditions')
   })

 // Routes for adding another condition //
 router.post('/prompts-two/conditions', function(req, res) {
    const conditionName = req.session.data['condition-name-first']
    const conditionLength = req.session.data['condition-start']
    const diagnosis = req.session.data['diagnosis']
    const medicalcareTreatments = req.session.data['meds-care-treatments']
    const hospital = req.session.data['hospital-admission']
    const hospitalCheck = req.session.data['hospital-admission-check']
    const conditionSymptoms = req.session.data['symptoms']
    const conditionVariability = req.session.data['variability']
    const conditionVariabilityCheck = req.session.data['variability-check']
    const mentalHealth = req.session.data['mental-health-description']
    const mentalHealthCheck = req.session.data['mental-health-check']
    const functionalRestriction = req.session.data['functional-restriction']
  
    const conditionAdded = req.session.data.conditionAdded || []
    conditionAdded.push({ conditionName, conditionLength, diagnosis, medicalcareTreatments, conditionSymptoms, hospital, hospitalCheck, conditionVariability, conditionVariabilityCheck, mentalHealth, mentalHealthCheck, functionalRestriction })
    req.session.data.conditionAdded = conditionAdded
  
    req.session.data.conditionAdded[req.session.data.conditionAdded.length - 1].action
  
  res.redirect('/prompts-two/conditions-addAnother')
 })

 router.post('/prompts-two/conditions-addAnother', function(req, res) {

  res.redirect('/prompts-two/conditions')
})

 // Routes for adding another medication
 router.post('/prompts-two/medications-none', function(req, res) {
      
  res.redirect('/prompts-two/medication')
 })


// Routes for adding another medication //
router.post('/prompts-two/medication', function(req, res) {
  const medicationName = req.session.data['medications-name']
  const medicationDose = req.session.data['medications-dose']
  const medicationFrequency = req.session.data['medications-frequency']
  const medicationReason = req.session.data['medications-reason']
  const medicationEffectiveness = req.session.data['medications-efficacy']
  const medicationSideEffect = req.session.data['medications-side-effects']
  
  const medicationAdded = req.session.data.medicationAdded || []
  medicationAdded.push({ medicationName, medicationDose, medicationFrequency, medicationReason, medicationSideEffect, medicationEffectiveness })
  req.session.data.medicationAdded = medicationAdded

  req.session.data.medicationAdded[req.session.data.medicationAdded.length - 1].action

res.redirect('/prompts-two/medication-addAnother')
})

router.post('/prompts-two/medication-addAnother', function(req, res) {

  res.redirect('/prompts-two/medication')
})

 // Routes for adding another treatment
 router.post('/prompts-two/treatments-none', function(req, res) {
      
  res.redirect('/prompts-two/treatment')
 })


// Routes for adding another medication //
router.post('/prompts-two/treatment', function(req, res) {
  const treatmentName = req.session.data['treatments-name']
  const treatmentFrequency = req.session.data['treatments-frequency']
  const treatmentReason = req.session.data['treatments-reason']
  const treatmentEffectiveness = req.session.data['treatments-efficacy']
  const treatmentLocation = req.session.data['treatments-location']
  
  const treatmentAdded = req.session.data.treatmentAdded || []
  treatmentAdded.push({ treatmentName, treatmentFrequency, treatmentReason, treatmentEffectiveness, treatmentLocation })
  req.session.data.treatmentAdded = treatmentAdded

  req.session.data.treatmentAdded[req.session.data.treatmentAdded.length - 1].action

res.redirect('/prompts-two/treatment-addAnother')
})

router.post('/prompts-two/treatment-addAnother', function(req, res) {

  res.redirect('/prompts-two/treatment')
})