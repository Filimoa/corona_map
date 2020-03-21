import requests
import datetime
import pytz
import os


def calc_pct_change(df , state, date,  days_back = 4 ):
  '''
  Function to calculate the % change in cases over n_days

  Params:
  df: dataframe with daily case count
  day: datetime day to end on
  state: abbreviated name ex: "OH"
  day: number of days to go back

  Output % change
  '''
  
  df["date"] = df["date"].astype(str)
  df = df[df["state"] == state]

  end_date = date - datetime.timedelta(days=days_back)
  case_history = []

  while date >= end_date:

    # how the daily case count formats their dates
    format_date = "{}{:02d}{:02d}".format(date.year, date.month, date.day)

    # state has has cases
    if format_date in df.date.values:     
      day_df = df[df["date"] == format_date]
      
      if day_df.shape[0] > 1:
        raise RuntimeError("Filtered df should only contain 1 value")

      total_cases = day_df["positive"].sum()

    else:
      total_cases = 0

    case_history.append(total_cases)
    date -= datetime.timedelta(days=1)

  if  case_history[-1] == 0:
    return 0
  
  pct_change = (case_history[0] +  case_history[-1])/ case_history[-1] * 100

  return int(pct_change)




