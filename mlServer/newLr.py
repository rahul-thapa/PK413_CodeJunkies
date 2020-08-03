import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
data = pd.read_csv(r'final.csv')
df_Area = data[['Area']]

X = df_Area
Y = data['Production']
training_x, testing_x, training_y, testing_y = train_test_split(
    X, Y, test_size=0.3, random_state=0)
lm = LinearRegression()
lm.fit(training_x, training_y)


def dta(a):
    test = [[a]]
    df = pd.DataFrame(test, columns=['Area'])
    return df


def productionPredict(area):
    testdata = dta(area)
    Yhat = lm.predict(testdata)

    return {"output": list(Yhat)}


# Main function that predicts, takes area as arguments
