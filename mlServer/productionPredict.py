import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


# def predictProduction(state=None, season=None, crop=None, area=None):
#     data = pd.read_csv(r'final.csv')
#     data_state = data[data["State_Name"] == state]
#     data_state_season = data_state[data_state['Season'] == season]
#     crop_values = data_state_season[data_state_season['Crop'] == crop]
#     if not crop_values.empty:
#         X = crop_values['Area'].values.reshape(-1, 1)
#         Y = crop_values['Production'].values.reshape(-1, 1)
#         mean_x = np.mean(X)
#         mean_y = np.mean(Y)
#         t = len(X)
#         training_x, testing_x, training_y, testing_y = train_test_split(
#             X, Y, test_size=0.3, random_state=0)
#         Lin = LinearRegression()
#         Lin.fit(training_x, training_y)
#         output = Lin.predict([[area]]).flatten()[0]
#         outputDict = {'production': float(output)}
#         print(outputDict)
#         return outputDict


def predictProduction(state=None, season=None, crop=None, area=None):
    data = pd.read_csv(r'final.csv')
    data_state = data[data["State_Name"] == state]
    data_state_season = data_state[data_state['Season'] == season]
    crop_values = data_state_season[data_state_season['Crop'] == crop]
    if not crop_values.empty:
        X = crop_values['Area'].values.reshape(-1, 1)
        Y = crop_values['Production'].values.reshape(-1, 1)
        Lin = LinearRegression()
        Lin.fit(X, Y)
        if area > 0:
            pred = (Lin.predict([[area]]).flatten()[0]) - \
                (Lin.predict([[0]]).flatten()[0])
        else:
            pred = 0.0
        print(pred)
        return {'production': float(pred)}


#predictProduction('Assam', 'Kharif', 'Rice', 10)
