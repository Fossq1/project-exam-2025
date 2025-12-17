namespace SportsworldAPI.Interfaces;

//Represents the finance data for the application.
interface IFinance
{
    int Id { get; set; }
    int MoneyLeft { get; set; }
    int NumberOfPurchases { get; set; }
    int MoneySpent { get; set; }
}