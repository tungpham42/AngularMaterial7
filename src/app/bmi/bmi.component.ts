import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiComponent {
  weight: number;
  height: number;
  bmiValue: number;
  bmiExplanation: string;
  idealWeight: string;
  idealHeight: string;
  recommendation: string;

  weightChange(newWeight: number) {
    this.weight = newWeight;
    this.bmiValue = calculateBmiValue(this.weight, this.height);
    this.bmiExplanation = calculateBmiExplanation(this.bmiValue);
    this.idealWeight = calculateIdealWeight(this.weight, this.height);
    this.idealHeight = calculateIdealHeight(this.weight, this.height);
    this.recommendation = calculateRecommendation(this.weight, this.height);
    console.log(newWeight);
  }
  heightChange(newHeight: number) {
    this.height = newHeight;
    this.bmiValue = calculateBmiValue(this.weight, this.height);
    this.bmiExplanation = calculateBmiExplanation(this.bmiValue);
    this.idealWeight = calculateIdealWeight(this.weight, this.height);
    this.idealHeight = calculateIdealHeight(this.weight, this.height);
    this.recommendation = calculateRecommendation(this.weight, this.height);
    console.log(newHeight);
  }
  constructor() {
  }
}

function roundTwoDecimal(number: number) {
  return Math.round(number*100)/100;
}
function calculateBmi(weight: number,height: number) {
  return roundTwoDecimal(weight/Math.pow(height/100,2));
}
function calculateWeight(bmi: number,height: number) {
  return Math.round(bmi*Math.pow(height/100,2));
}
function calculateHeight(bmi: number,weight: number) {
  return Math.round(Math.sqrt(weight/bmi)*100);
}
function isset(variable) {
  if (typeof variable !== 'undefined' && variable !== 'undefined' && variable !== null) {
      return !0
  } else {
      return !1
  }
}
function calculateBmiValue(weight: number, height: number) {
  if (isset(weight) && isset(height) && $.isNumeric(weight) && $.isNumeric(height)) {
    return calculateBmi(weight,height);
  }
}
function calculateBmiExplanation(value: number) {
  if (!isNaN(value)) {
    if (value < 15) {
      return 'very severely underweight';
    } else if (value >= 15 && value < 16) {
      return 'severely underweight';
    } else if (value >= 16 && value < 18.5) {
      return 'underweight';
    } else if (value >= 18.5 && value <= 25) {
      return 'healthy weight';
    } else if (value > 25 && value <= 30) {
      return 'overweight';
    } else if (value > 30 && value <= 35) {
      return 'moderately obese';
    } else if (value > 35 && value <= 40) {
      return 'severely obese';
    } else if (value > 40) {
      return 'very severely obese';
    }
  }
}
function calculateMinWeight(weight: number, height: number) {
  if (isset(height) && $.isNumeric(height)) {
    if (calculateBmi(calculateWeight(18.5,height),height) < 18.5) {
      return calculateWeight(18.5,height)+1;
    } else if (calculateBmi(calculateWeight(18.5,height),height) >= 18.5 && calculateBmi(calculateWeight(18.5,height),height) <= 25) {
      return calculateWeight(18.5,height);
    }
  }
}
function calculateMaxWeight(weight: number, height: number) {
  if (isset(height) && $.isNumeric(height)) {
    if (calculateBmi(calculateWeight(25,height),height) > 25) {
      return calculateWeight(25,height)-1;
    } else if (calculateBmi(calculateWeight(25,height),height) >= 18.5 && calculateBmi(calculateWeight(25,height),height) <= 25) {
      return calculateWeight(25,height);
    }
  }
}
function calculateIdealWeight(weight: number, height: number) {
  if (isset(height) && $.isNumeric(height)) {
    return 'from ' + calculateMinWeight(weight,height) + ' to ' + calculateMaxWeight(weight,height) + ' kg';
  }
}
function calculateMinHeight(weight: number, height: number) {
  if (isset(weight) && $.isNumeric(weight)) {
    if (calculateBmi(weight,calculateHeight(25,weight)) > 25) {
      return calculateHeight(25,weight)+1;
    } else if (calculateBmi(weight,calculateHeight(25,weight)) >= 18.5 && calculateBmi(weight,calculateHeight(25,weight)) <= 25) {
      return calculateHeight(25,weight);
    }
  }
}
function calculateMaxHeight(weight: number, height: number) {
  if (isset(weight) && $.isNumeric(weight)) {
    if (calculateBmi(weight,calculateHeight(18.5,weight)) < 18.5) {
      return calculateHeight(18.5,weight)-1;
    } else if (calculateBmi(weight,calculateHeight(18.5,weight)) >= 18.5 && calculateBmi(weight,calculateHeight(18.5,weight)) <= 25) {
      return calculateHeight(18.5,weight);
    }
  }
}
function calculateIdealHeight(weight: number, height: number) {
  if (isset(weight) && $.isNumeric(weight)) {
    return 'from ' + calculateMinHeight(weight,height) + ' to ' + calculateMaxHeight(weight,height) + ' centimeter';
  }
}
function calculateChange(weight: number, height: number) {
  if (isset(weight) && isset(height) && $.isNumeric(weight) && $.isNumeric(height)) {
    if (weight < calculateMinWeight(weight,height)) {
      return 'increase';
    } else if (weight > calculateMaxWeight(weight,height)) {
      return 'decrease';
    }
  }
}
function calculateWeightChanged(weight: number, height: number) {
  if (isset(weight) && isset(height) && $.isNumeric(weight) && $.isNumeric(height)) {
    if (weight < calculateMinWeight(weight,height)) {
      return calculateMinWeight(weight,height)-weight;
    } else if (weight > calculateMaxWeight(weight,height)) {
      return weight-calculateMaxWeight(weight,height);
    }
  }
}
function calculateRecommendation(weight: number, height: number) {
  if (isset(weight) && isset(height) && $.isNumeric(weight) && $.isNumeric(height)) {
    if (weight < calculateMinWeight(weight,height) || weight > calculateMaxWeight(weight,height)) {
      return 'should ' + calculateChange(weight,height) + ' ' + calculateWeightChanged(weight,height) + ' kg';
    } else if (weight >= calculateMinWeight(weight,height) && weight <= calculateMaxWeight(weight,height)) {
      return 'good health';
    }
  }
}