using System.ComponentModel.DataAnnotations;
using SportsworldAPI.Interfaces;

namespace SportsworldAPI.Models;

public class Finance : IFinance
{
  public  int Id { get; set; }
  public  double MoneyLeft { get; set; }
   public int NumberOfPurchases { get; set; }
   public double MoneySpent { get; set; }
}