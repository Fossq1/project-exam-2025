using System.ComponentModel.DataAnnotations;
using SportsworldAPI.Interfaces;

namespace SportsworldAPI.Models;

//Finance model is of type IFinance which means the model has to meet the minimum requirements of the Interface.
// It is used to store budget and purchase information.

public class Finance : IFinance
{
  public  int Id { get; set; }
  public  int MoneyLeft { get; set; }
   public int NumberOfPurchases { get; set; }
   public int MoneySpent { get; set; }
}