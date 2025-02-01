#include <stdio.h>
#include <stdlib.h>
#include <time.h>

char ch[][10] = { "ROCK","PAPER","SCISSORS"};

// Generating random number from cpu
int cpuInput()
{
  srand(time(NULL));
  return rand() % 3;
}

// Taking input from user
int playerChoice(int p, int c)
{
  if (p == c) return 0;
  if ((p+1)%3 == c) return 1;
  return 2;
}

// Declaring scores after every round
void roundWinner(int *playerScore, int *cpuScore, char name[], int i)
{
  int p , c = cpuInput();
  int temp1 = *playerScore, temp2 = *cpuScore;
  printf("Enter your Choice:-\n");
  scanf("%d", &p);
  printf("\n");
  printf("You Chose %s\n",ch[p]);
  printf("CPU Chose %s\n",ch[c]);
  printf("\n");
  int w = playerChoice(p, c);
  if (w == 1){
    printf("CPU WON ROUND %d\n\n", i+1);
    temp2++;
  }

  else if (w == 0){
    printf("IT'S A DRAW\n\n");
  }

  else{
    printf("%s WON ROUND %d\n\n",name , i+1);
    temp1++;
  }
  *playerScore = temp1;
  *cpuScore = temp2;
}

// Declaring overall scores after 3 rounds are done
int overallScore(int playerScore, int cpuScore, char name[])
{
  printf("FINAL SCORES:-\n");
  printf("%s - %d\tCPU - %d\n", name, playerScore, cpuScore);
  printf("\n");
}

// Declaring final results and announcing the winner
int finalResults(int playerScore, int cpuScore, char name[])
{
  if (playerScore > cpuScore)
  {
    printf("%s WON THE GAME!!\n", name);
    printf("CONGRATULATIONS!!\n");
    printf("\n");
  }

  else if (playerScore < cpuScore)
  {
    printf("CPU WON THE GAME!!\n");
    printf("BETTER LUCK NEXT TIME!!\n");
    printf("\n");
  }

  else
  {
    printf("IT'S A DRAW!!\n");
    printf("GOOD GAME!!\n");
    printf("\n");
  }
}

// final function for rock paper scissors
int rockPaperScissors()
{
  int playerScore = 0, cpuScore = 0;
  char name[20];
  printf("\n");
  printf("Let's play Rock, Paper and Scissors!!!\n");
  printf("\n");
  printf("You will get 3 chances to play out of which you have to Win atleast 2 matches to become a Winner\n");
  printf("\n");
  printf("Enter a User Name for  your Profile:\n");
  gets(name);
  printf("\n");
  printf("Choose:\n0 for ROCK\n1 for PAPER\n2 for SCISSORS\n");
  printf("\n");

  for (int i = 0; i < 3; i++)
  {
    roundWinner(&playerScore, &cpuScore, name, i);
  }

  overallScore(playerScore, cpuScore, name);
  finalResults(playerScore, cpuScore, name);

  printf("THANK YOU FOR PLAYING!!\n");

  return 0;
}

int main()
{
  rockPaperScissors();
  return 0;
}
